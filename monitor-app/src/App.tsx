import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  GitGraph, 
  GitPullRequest, 
  Users, 
  AlertCircle,
  Settings,
  Bell,
  Search,
  LayoutDashboard,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart,
  LogOut,
  LogIn,
  List
} from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, githubProvider, db } from './firebase';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('facebook/react');
  const [repoData, setRepoData] = useState<any>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [powerBiUrl, setPowerBiUrl] = useState<string>(localStorage.getItem('powerbi_url') || '');
  const [user, setUser] = useState<{name: string | null, avatar: string | null, email: string | null, screenName?: string} | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(sessionStorage.getItem('github_token'));
  const [myRepos, setMyRepos] = useState<any[]>([]);
  const [showRepos, setShowRepos] = useState(false);

  // Función para buscar repositorio en GitHub API
  const fetchRepoData = async (rawQuery: string, token?: string | null) => {
    // Sanitizar entrada por si el usuario pega una URL completa
    let query = rawQuery.trim();
    if (query.includes('github.com/')) {
        const parts = query.split('github.com/')[1].split('/');
        if (parts.length >= 2) {
            query = `${parts[0]}/${parts[1].replace('.git', '')}`;
        }
    }
    setSearchQuery(query); // Actualizamos la barra de búsqueda para que se vea limpio

    if (!query.includes('/')) return; // Debe ser owner/repo
    setLoading(true);
    try {
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const response = await fetch(`https://api.github.com/repos/${query}`, { headers });
      if (response.ok) {
        const data = await response.json();
        setRepoData(data);
        
        // 1. Obtener issues para ver tareas asignadas al equipo (Inteligencia de Negocios)
        let issueCounts: Record<string, number> = {};
        const issuesRes = await fetch(`https://api.github.com/repos/${query}/issues?state=open&per_page=100`, { headers });
        if (issuesRes.ok) {
          const issues = await issuesRes.json();
          issues.forEach((issue: any) => {
            issue.assignees?.forEach((assignee: any) => {
              issueCounts[assignee.login] = (issueCounts[assignee.login] || 0) + 1;
            });
          });
        }

        // 2. Obtener colaboradores y combinarlos con sus tareas asignadas
        const contribResponse = await fetch(`https://api.github.com/repos/${query}/contributors?per_page=12`, { headers });
        if (contribResponse.ok) {
          const contribData = await contribResponse.json();
          const enrichedContributors = contribData.map((c: any) => ({
             ...c,
             assigned_tasks: issueCounts[c.login] || 0
          }));
          setContributors(enrichedContributors);
        } else {
          setContributors([]);
        }

        // 3. Obtener Milestones (Cronograma)
        const milestonesRes = await fetch(`https://api.github.com/repos/${query}/milestones?state=all`, { headers });
        if (milestonesRes.ok) {
          const mData = await milestonesRes.json();
          setMilestones(mData);
        } else {
          setMilestones([]);
        }

      } else {
        setRepoData(null);
        setContributors([]);
        setMilestones([]);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setRepoData(null);
      setContributors([]);
      setMilestones([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRepoData(searchQuery, githubToken);
    
    // Escuchar el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const anyUser = currentUser as any;
        setUser({
          name: currentUser.displayName || 'Usuario GitHub',
          avatar: currentUser.photoURL,
          email: currentUser.email,
          screenName: anyUser.reloadUserInfo?.screenName
        });
      } else {
        setUser(null);
        setGithubToken(null);
        sessionStorage.removeItem('github_token');
        setMyRepos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRepoData(searchQuery, githubToken);
  };

  const handleLogin = async () => {
    try {
      // Pedimos permiso para leer repositorios (públicos y privados)
      githubProvider.addScope('repo');
      const result = await signInWithPopup(auth, githubProvider);
      
      // Obtener el Token de GitHub para poder usar la API en nombre del usuario
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (token) {
        setGithubToken(token);
        sessionStorage.setItem('github_token', token);
      }

      const loggedUser = result.user;
      
      // Guardar o actualizar usuario en Firestore
      await setDoc(doc(db, "users", loggedUser.uid), {
        uid: loggedUser.uid,
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        lastLogin: serverTimestamp()
      }, { merge: true });

    } catch (error) {
      console.error("Error en login con GitHub:", error);
      alert("Hubo un error al iniciar sesión. Revisa la consola.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('github_token');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const fetchMyRepos = async () => {
    if (!githubToken) {
      alert("Por favor vuelve a Iniciar Sesión para conectar con GitHub.");
      return;
    }
    
    if (showRepos && myRepos.length > 0) {
      setShowRepos(false);
      return;
    }

    try {
      const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=15', {
        headers: { Authorization: `Bearer ${githubToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMyRepos(data);
        setShowRepos(true);
      } else {
        console.error("Error al obtener repositorios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectRepo = (repoFullName: string) => {
    setSearchQuery(repoFullName);
    fetchRepoData(repoFullName, githubToken);
    setShowRepos(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <GitGraph size={24} />
          </div>
          <div>
            <h1>GitHub Metrics<br/>Monitor</h1>
          </div>
        </div>
        
        <nav>
          <ul className="nav-menu">
            <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={20} />
              <span>Dashboard BI</span>
            </li>
            <li className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              <GitGraph size={20} />
              <span>Repositorios</span>
            </li>
            <li className={`nav-item ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
              <Users size={20} />
              <span>Equipo</span>
            </li>
            <li className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
              <Calendar size={20} />
              <span>Cronograma</span>
            </li>
            <li className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <Settings size={20} />
              <span>Configuración</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            <h2>Panel de Inteligencia de Negocios</h2>
            <p>Análisis en tiempo real del progreso del proyecto</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="usuario/repositorio..." 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '200px' }}
              />
            </form>
            
            <div style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}><Bell size={20} /></div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                <button 
                  onClick={fetchMyRepos}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(88, 166, 255, 0.1)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
                >
                  <List size={18} />
                  Mis Repos
                </button>
                
                <div className="team-members" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Cerrar sesión">
                  <img src={user.avatar || ''} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white' }} />
                  <span>{user.screenName || user.name}</span>
                  <LogOut size={16} style={{ marginLeft: '0.5rem', color: 'var(--danger-color)' }} />
                </div>

                {/* Dropdown de repositorios */}
                {showRepos && (
                  <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem', width: '300px', maxHeight: '400px', overflowY: 'auto', zIndex: 10, boxShadow: 'var(--glass-shadow)', backdropFilter: 'blur(12px)' }}>
                    <h4 style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>Últimos repositorios</h4>
                    {myRepos.length === 0 ? <p style={{ padding: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No se encontraron repositorios.</p> : null}
                    {myRepos.map(repo => (
                      <div 
                        key={repo.id} 
                        onClick={() => selectRepo(repo.full_name)}
                        style={{ padding: '0.8rem', cursor: 'pointer', borderRadius: '6px', marginBottom: '0.2rem', transition: 'background 0.2s', display: 'flex', flexDirection: 'column' }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(88, 166, 255, 0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{repo.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{repo.private ? 'Privado' : 'Público'} • {new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-color)', color: 'var(--bg-dark)', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                <LogIn size={18} />
                Iniciar Sesión
              </button>
            )}
          </div>
        </header>

        {/* Info Repositorio Seleccionado (Visible en todas las pestañas) */}
        {repoData && (
          <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(88, 166, 255, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={repoData.owner.avatar_url} alt="Owner" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
            <div>
              <h3 style={{ color: 'var(--accent-color)' }}>{repoData.full_name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{repoData.description || 'Sin descripción'}</p>
            </div>
          </div>
        )}

        {/* --- CONTENIDO DINÁMICO POR PESTAÑA --- */}
        
        {/* PESTAÑA: DASHBOARD BI */}
        {activeTab === 'dashboard' && (
          <>
            {/* Metrics Cards */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <span>Total Commits (Aprox)</span>
                  <GitGraph size={18} />
                </div>
                <div className="metric-value">
                  {loading ? '...' : (repoData ? (repoData.size > 1000 ? '+1k' : repoData.size) : '0')}
                </div>
                <div className="metric-trend trend-up">
                  <TrendingUp size={14} />
                  <span>Actualizado recientemente</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span>Estrellas (Stars)</span>
                  <GitPullRequest size={18} />
                </div>
                <div className="metric-value">
                  {loading ? '...' : (repoData?.stargazers_count || 0)}
                </div>
                <div className="metric-trend trend-up">
                  <TrendingUp size={14} />
                  <span>Popularidad del repo</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span>Forks (Bifurcaciones)</span>
                  <AlertCircle size={18} />
                </div>
                <div className="metric-value">
                  {loading ? '...' : (repoData?.forks_count || 0)}
                </div>
                <div className="metric-trend trend-up">
                  <TrendingUp size={14} />
                  <span>Participación externa</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-header">
                  <span>Issues Abiertos</span>
                  <BarChart3 size={18} />
                </div>
                <div className="metric-value">
                  {loading ? '...' : (repoData?.open_issues_count || 0)}
                </div>
                <div className="metric-trend trend-down">
                  <TrendingDown size={14} />
                  <span>Pendientes de resolver</span>
                </div>
              </div>
            </div>

            {/* Power BI Container */}
            <div className="powerbi-container">
              <div className="powerbi-header">
                <h3>Reporte Power BI: Toma de Decisiones</h3>
                <button style={{ 
                  background: 'rgba(88, 166, 255, 0.1)', 
                  border: '1px solid var(--accent-color)', 
                  color: 'var(--accent-color)',
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}>
                  Actualizar Datos
                </button>
              </div>
              
              <div className="powerbi-wrapper">
                {powerBiUrl ? (
                  <iframe 
                    title="Reporte Power BI" 
                    width="100%" 
                    height="100%" 
                    src={powerBiUrl} 
                    frameBorder="0" 
                    allowFullScreen={true}
                    style={{ borderRadius: '8px', minHeight: '500px' }}
                  ></iframe>
                ) : (
                  <div className="placeholder-content">
                    <BarChart className="placeholder-icon" size={64} />
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ color: '#323130', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Espacio Reservado para Power BI</h4>
                      <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>
                        Ve a la pestaña de "Configuración" para pegar el enlace seguro de tu reporte de Power BI.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* PESTAÑA: EQUIPO */}
        {activeTab === 'team' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Análisis del Equipo (Colaboradores)</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Métricas de contribución individual para el repositorio actual. Permite tomar decisiones sobre asignación de recursos y carga de trabajo.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {loading ? (
                <p>Cargando equipo...</p>
              ) : contributors.length > 0 ? (
                contributors.map(member => (
                  <div key={member.id} className="metric-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                    <img src={member.avatar_url} alt={member.login} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--border-color)' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, color: 'var(--accent-color)' }}>{member.login}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Colaborador</p>
                      
                      <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <GitGraph size={14} style={{ color: 'var(--success-color)' }} />
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{member.contributions} aportes (commits)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertCircle size={14} style={{ color: member.assigned_tasks >= 3 ? 'var(--danger-color)' : 'var(--text-secondary)' }} />
                          <span style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 600, 
                            color: member.assigned_tasks >= 3 ? 'var(--danger-color)' : 'var(--text-primary)'
                          }}>
                            {member.assigned_tasks} tareas asignadas {member.assigned_tasks >= 3 && '(Sobrecarga)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="metric-card"><p>No se encontraron datos de colaboradores.</p></div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA: REPOSITORIOS */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Comparador de Repositorios</h3>
            <div className="powerbi-container" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <Search size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                <h4>Buscador Global de Proyectos</h4>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginTop: '0.5rem' }}>
                  En esta sección, en el futuro se implementará una tabla comparativa para analizar múltiples repositorios (ej. los de toda tu universidad) simultáneamente, en lugar de uno por uno.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: CRONOGRAMA */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Cronograma (Milestones)</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Seguimiento de hitos y progreso de las fases del proyecto. Ideal para monitorear fechas de entrega.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {loading ? (
                <p>Cargando cronograma...</p>
              ) : milestones.length > 0 ? (
                milestones.map(milestone => {
                  const totalIssues = milestone.open_issues + milestone.closed_issues;
                  const progress = totalIssues === 0 ? 0 : Math.round((milestone.closed_issues / totalIssues) * 100);
                  const isOverdue = milestone.due_on && new Date(milestone.due_on) < new Date() && milestone.state === 'open';
                  
                  return (
                    <div key={milestone.id} className="metric-card" style={{ display: 'block' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{milestone.title}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                            {milestone.description || 'Sin descripción'}
                          </p>
                        </div>
                        <span style={{ 
                          padding: '0.3rem 0.6rem', 
                          borderRadius: '12px', 
                          fontSize: '0.8rem', 
                          fontWeight: 600,
                          background: milestone.state === 'closed' ? 'rgba(63, 185, 80, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                          color: milestone.state === 'closed' ? 'var(--success-color)' : 'var(--accent-color)'
                        }}>
                          {milestone.state === 'closed' ? 'Completado' : 'En progreso'}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 600 }}>Avance: {progress}%</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{milestone.closed_issues} / {totalIssues} Tareas completadas</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? 'var(--success-color)' : 'var(--accent-color)', transition: 'width 0.3s' }}></div>
                      </div>
                      
                      <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: isOverdue ? 'var(--danger-color)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={14} />
                        {milestone.due_on ? (
                          <span style={{ fontWeight: isOverdue ? 600 : 400 }}>
                            Fecha de entrega: {new Date(milestone.due_on).toLocaleDateString()}
                            {isOverdue && ' (¡Atención: Atrasado!)'}
                          </span>
                        ) : 'Sin fecha límite definida'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="metric-card">
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Calendar size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                    <p style={{ margin: 0 }}>Este repositorio no tiene hitos (Milestones) configurados en GitHub.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA: CONFIGURACIÓN */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Configuración del Dashboard</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Ajustes y conexión con herramientas externas de Inteligencia de Negocios.</p>
            
            <div className="metric-card" style={{ display: 'block', maxWidth: '700px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <BarChart size={24} style={{ color: 'var(--accent-color)' }} />
                <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Integración con Power BI</h4>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Para mostrar tus gráficos interactivos, publica tu reporte en Power BI Service y selecciona "Publicar en la web". Luego, pega el enlace seguro (URL) que te proporcionan aquí abajo:
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <input 
                  type="text" 
                  placeholder="Ejemplo: https://app.powerbi.com/view?r=..." 
                  value={powerBiUrl}
                  onChange={(e) => {
                    setPowerBiUrl(e.target.value);
                    localStorage.setItem('powerbi_url', e.target.value);
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    background: 'var(--bg-dark)', 
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                {powerBiUrl && <span style={{ color: 'var(--success-color)', fontSize: '0.85rem' }}>✓ Enlace vinculado y guardado correctamente. Revisa el Dashboard BI.</span>}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
