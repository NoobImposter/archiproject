import { Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import { FitnessPlan } from './FitnessPlan';
const App = () => {
  return (
  <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>FitTrack</div>
          
          <nav style={styles.desktopNav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/plan" style={styles.navLink}>My Plan</Link>
          </nav>
        </div>
      </header>

      {/* Routes - This replaces <Outlet /> */}
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<FitnessPlan />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>FitTrack</div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
            <a href="#" style={styles.footerLink}>Support</a>
            <a href="#" style={styles.footerLink}>Contact</a>
          </div>
          <p style={styles.footerCopyright}>© 2026 FitTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

// ==================== STYLES ====================
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#f7f9fb',
    color: '#191c1e',
    width: "100vw",
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', sans-serif",
    WebkitFontSmoothing: 'antialiased',
  },

  // ── Header ──────────────────────────────────────────
  header: {
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #bccbb9',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    zIndex: 100,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    padding: '0 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  logo: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#006e2f',
    letterSpacing: '-0.02em',
  },
  desktopNav: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    fontSize: '15px',
    color: '#3d4a3d',
    textDecoration: 'none',
    fontWeight: 500,
  },

  // ── Main ─────────────────────────────────────────────
  main: {
    flex: 1,
  },

  // ── Footer ─────────────────────────────────────────────
  footer: {
    backgroundColor: '#eceef0',
    borderTop: '1px solid #bccbb9',
    padding: '24px 16px',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '12px',
    textAlign: 'center',
  },
  footerLogo: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#006e2f',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px',
  },
  footerLink: {
    fontSize: '13px',
    color: '#3d4a3d',
    textDecoration: 'none',
  },
  footerCopyright: {
    fontSize: '12px',
    color: '#3d4a3d',
    margin: 0,
  },
};

export { styles };