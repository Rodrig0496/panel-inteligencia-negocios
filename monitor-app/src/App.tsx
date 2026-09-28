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
  LogIn
} from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, githubProvider, db } from './firebase';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('facebook/react');
  const [repoData, setRepoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{name: string | null, avatar: string | null, email: string | null} | null>(null);

  // Función para buscar repositorio en GitHub API
  const fetchRepoData = async (query: string) => {
    if (!query.includes('/')) return; // Debe ser owner/repo
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${query}`);
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
    fetchRepoData(searchQuery);
    
    // Escuchar el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Usuario GitHub',
          avatar: currentUser.photoURL,
          email: currentUser.email
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRepoData(searchQuery);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
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
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
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
              <div className="team-members" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Cerrar sesión">
                <img src={user.avatar || ''} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white' }} />
                <span>{user.name}</span>
                <LogOut size={16} style={{ marginLeft: '0.5rem', color: 'var(--danger-color)' }} />
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
