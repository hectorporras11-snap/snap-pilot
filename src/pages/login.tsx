import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const COLORS = {
  primary: '#4c1c72',
  accent: '#a376ce',
  primaryLight: '#f3eef9',
  white: '#ffffff',
  gray100: '#f9fafb',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray900: '#111827',
  error: '#ef4444',
};

const styles: any = {
  page: {
    fontFamily: "'Raleway', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  leftPanel: {
    width: '42%',
    backgroundColor: '#4c1c72',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '48px 56px',
    position: 'relative',
    overflow: 'hidden',
  },
  leftPanelBg: {
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: 'rgba(163, 118, 206, 0.2)',
  },
  leftPanelBg2: {
    position: 'absolute',
    bottom: '-60px',
    left: '-60px',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    backgroundColor: 'rgba(163, 118, 206, 0.15)',
  },
  logo: { display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 1 },
  logoText: { fontSize: '52px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-1px', lineHeight: 1 },
  logoDot: { color: '#a376ce' },
  logoSubtitle: { fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: '0.5px', fontWeight: '500' },
  leftContent: { zIndex: 1 },
  leftTitle: { fontSize: '32px', fontWeight: '700', color: '#ffffff', margin: '0 0 20px 0', lineHeight: '1.3' },
  leftDesc: { fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', margin: '0 0 40px 0' },
  featureList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  featureItem: { display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '500' },
  featureDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a376ce', flexShrink: 0 },
  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', backgroundColor: '#ffffff' },
  formWrapper: { width: '100%', maxWidth: '440px' },
  formTitle: { fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' },
  formSubtitle: { fontSize: '15px', color: '#4b5563', margin: '0 0 36px 0' },
  fieldGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px', letterSpacing: '0.3px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', fontFamily: "'Raleway', sans-serif", color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#ffffff' },
  btnPrimary: { width: '100%', padding: '14px', backgroundColor: '#4c1c72', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', fontFamily: "'Raleway', sans-serif", cursor: 'pointer', marginTop: '8px' },
  forgotLink: { display: 'block', textAlign: 'right', fontSize: '13px', color: '#4c1c72', fontWeight: '600', textDecoration: 'none', marginTop: '6px' },
  registerLink: { textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#4b5563' },
  link: { color: '#4c1c72', fontWeight: '600', textDecoration: 'none' },
  errorBox: { backgroundColor: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#b91c1c' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' },
  dividerLine: { flex: 1, height: '1px', backgroundColor: '#e5e7eb' },
  dividerText: { fontSize: '13px', color: '#9ca3af', whiteSpace: 'nowrap' },
};

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Las credenciales no son válidas. Por favor intenta de nuevo.');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Iniciar sesión — snap.</title>
        <meta name="description" content="Inicia sesión en SNAP — Sistema Nacional de Proveedores" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.page}>
        <div style={styles.leftPanel}>
          <div style={styles.leftPanelBg} />
          <div style={styles.leftPanelBg2} />
          <div style={styles.logo}>
            <h1 style={styles.logoText}>snap<span style={styles.logoDot}>.</span></h1>
            <p style={styles.logoSubtitle}>Sistema Nacional de Proveedores</p>
          </div>
          <div style={styles.leftContent}>
            <h2 style={styles.leftTitle}>Bienvenido de vuelta a la red comercial de México</h2>
            <p style={styles.leftDesc}>Accede a tu cuenta y conecta con proveedores verificados, gestiona cotizaciones y participa en licitaciones.</p>
            <div style={styles.featureList}>
              {['Directorio de proveedores verificados', 'Solicitudes de cotización en minutos', 'Chat directo con proveedores', 'Licitaciones y concursos de proyectos'].map((f) => (
                <div key={f} style={styles.featureItem}>
                  <div style={styles.featureDot} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.formWrapper}>
            <h2 style={styles.formTitle}>Inicia sesión</h2>
            <p style={styles.formSubtitle}>Ingresa tus credenciales para acceder a tu cuenta</p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Correo electrónico</label>
              <input style={styles.input} type="email" name="email" placeholder="correo@empresa.com" value={formData.email} onChange={handleChange} />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Contraseña</label>
              <input style={styles.input} type="password" name="password" placeholder="Tu contraseña" value={formData.password} onChange={handleChange} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }} />
              <Link href="/forgot-password" style={styles.forgotLink}>¿Olvidaste tu contraseña?</Link>
            </div>

            <button style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar sesión'}
            </button>

            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>¿Aún no tienes cuenta?</span>
              <div style={styles.dividerLine} />
            </div>

            <p style={styles.registerLink}>
              <Link href="/register" style={styles.link}>Crear cuenta gratis →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
