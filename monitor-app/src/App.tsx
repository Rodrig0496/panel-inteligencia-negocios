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
      } else {
        setRepoData(null);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setRepoData(null);
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

        {/* Info Repositorio Seleccionado */}
        {repoData && (
          <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(88, 166, 255, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={repoData.owner.avatar_url} alt="Owner" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
            <div>
              <h3 style={{ color: 'var(--accent-color)' }}>{repoData.full_name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{repoData.description || 'Sin descripción'}</p>
            </div>
          </div>
        )}

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
            {/* Aquí irá el iframe de Power BI */}
            {/* Ejemplo: <iframe title="Report Section" width="100%" height="100%" src="YOUR_EMBED_URL" frameBorder="0" allowFullScreen="true"></iframe> */}
            
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
      </main>
    </div>
  );
}

export default App;
