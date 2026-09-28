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
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{name: string | null, avatar: string | null, email: string | null, screenName?: string} | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(sessionStorage.getItem('github_token'));
  const [myRepos, setMyRepos] = useState<any[]>([]);
  const [showRepos, setShowRepos] = useState(false);

  // Función para buscar repositorio en GitHub API
  const fetchRepoData = async (query: string, token?: string | null) => {
    if (!query.includes('/')) return; // Debe ser owner/repo
    setLoading(true);
    try {
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const response = await fetch(`https://api.github.com/repos/${query}`, { headers });
      if (response.ok) {
        const data = await response.json();
        setRepoData(data);
        
        // Obtener también los colaboradores (Equipo)
        const contribResponse = await fetch(`https://api.github.com/repos/${query}/contributors?per_page=12`, { headers });
        if (contribResponse.ok) {
          const contribData = await contribResponse.json();
          setContributors(contribData);
        } else {
          setContributors([]);
        }

      } else {
        setRepoData(null);
        setContributors([]);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setRepoData(null);
      setContributors([]);
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
                <div className="placeholder-content">
                  <BarChart className="placeholder-icon" size={64} />
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: '#323130', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Espacio Reservado para Power BI</h4>
                    <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>
                      Una vez que el dashboard de Power BI esté publicado en la web, el código Embed (iframe) se colocará aquí para visualizar los gráficos interactivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PESTAÑA: EQUIPO */}
        {activeTab === 'team' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Análisis del Equipo (Colaboradores)</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Métricas de contribución individual para el repositorio actual. Permite tomar decisiones sobre asignación de recursos y carga de trabajo.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {loading ? (
                <p>Cargando equipo...</p>
              ) : contributors.length > 0 ? (
                contributors.map(member => (
                  <div key={member.id} className="metric-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                    <img src={member.avatar_url} alt={member.login} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--border-color)' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, color: 'var(--accent-color)' }}>{member.login}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Colaborador</p>
                      
                      <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GitGraph size={14} style={{ color: 'var(--success-color)' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{member.contributions} aportes</span>
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
            <div className="powerbi-container" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <Calendar size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                <h4>Seguimiento de Hitos y Tareas</h4>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginTop: '0.5rem' }}>
                  Aquí se visualizará un Diagrama de Gantt o una línea de tiempo (Timeline) con las fechas de entrega del proyecto extraídas de la pestaña "Milestones" de GitHub.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: CONFIGURACIÓN */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Configuración del Dashboard</h3>
            <div className="powerbi-container" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <Settings size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                <h4>Ajustes de Integración</h4>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginTop: '0.5rem' }}>
                  En este panel podrás insertar el "Código Iframe" secreto de tu reporte de PowerBI cuando lo tengas listo, cambiar temas visuales y conectar otras herramientas.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
