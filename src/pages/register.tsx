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
  page: { fontFamily: "'Raleway', sans-serif", minHeight: '100vh', display: 'flex', backgroundColor: '#ffffff' },
  leftPanel: { width: '42%', backgroundColor: '#4c1c72', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 56px', position: 'relative', overflow: 'hidden' },
  leftPanelBg: { position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(163,118,206,0.2)' },
  leftPanelBg2: { position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(163,118,206,0.15)' },
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
  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', backgroundColor: '#ffffff', overflowY: 'auto' },
  formWrapper: { width: '100%', maxWidth: '440px' },
  formTitle: { fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' },
  formSubtitle: { fontSize: '15px', color: '#4b5563', margin: '0 0 32px 0' },
  stepsRow: { display: 'flex', alignItems: 'center', marginBottom: '36px' },
  stepCircle: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0, transition: 'all 0.3s' },
  stepLine: { flex: 1, height: '2px', margin: '0 8px', transition: 'background-color 0.3s' },
  stepLabel: { fontSize: '11px', fontWeight: '600', marginTop: '4px', textAlign: 'center' as const },
  fieldGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px', letterSpacing: '0.3px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', fontFamily: "'Raleway', sans-serif", color: '#111827', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' as const, backgroundColor: '#ffffff' },
  btnPrimary: { width: '100%', padding: '14px', backgroundColor: '#4c1c72', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', fontFamily: "'Raleway', sans-serif", cursor: 'pointer', transition: 'background-color 0.2s', marginTop: '8px' },
  btnSecondary: { width: '100%', padding: '14px', backgroundColor: 'transparent', color: '#4c1c72', border: '1.5px solid #4c1c72', borderRadius: '10px', fontSize: '15px', fontWeight: '600', fontFamily: "'Raleway', sans-serif", cursor: 'pointer', marginTop: '10px' },
  loginLink: { textAlign: 'center' as const, marginTop: '24px', fontSize: '14px', color: '#4b5563' },
  link: { color: '#4c1c72', fontWeight: '600', textDecoration: 'none' },
  tipoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  tipoCard: { padding: '20px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' as const, transition: 'all 0.2s' },
  tipoCardSelected: { borderColor: '#4c1c72', backgroundColor: '#f3eef9' },
  tipoIcon: { fontSize: '32px', marginBottom: '10px' },
  tipoTitle: { fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
  tipoDesc: { fontSize: '12px', color: '#4b5563', lineHeight: '1.4' },
  successContainer: { textAlign: 'center' as const, padding: '20px 0' },
  successIcon: { width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#f3eef9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' },
  errorText: { color: '#ef4444', fontSize: '12px', marginTop: '4px' },
};

function Step1({ formData, onChange, onNext }: any) {
  const [errors, setErrors] = useState<any>({});
  const validate = () => {
    const e: any = {};
    if (!formData.nombre.trim()) e.nombre = 'El nombre es requerido';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Correo inválido';
    if (formData.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <>
      <h2 style={styles.formTitle}>Crea tu cuenta</h2>
      <p style={styles.formSubtitle}>Ingresa tus datos para comenzar</p>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Nombre completo</label>
        <input style={styles.input} type="text" name="nombre" placeholder="Ej. Juan García López" value={formData.nombre} onChange={onChange} />
        {errors.nombre && <p style={styles.errorText}>{errors.nombre}</p>}
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Correo electrónico</label>
        <input style={styles.input} type="email" name="email" placeholder="correo@empresa.com" value={formData.email} onChange={onChange} />
        {errors.email && <p style={styles.errorText}>{errors.email}</p>}
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Contraseña</label>
        <input style={styles.input} type="password" name="password" placeholder="Mínimo 8 caracteres" value={formData.password} onChange={onChange} />
        {errors.password && <p style={styles.errorText}>{errors.password}</p>}
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Confirmar contraseña</label>
        <input style={styles.input} type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={formData.confirmPassword} onChange={onChange} />
        {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
      </div>
      <button style={styles.btnPrimary} onClick={() => { if (validate()) onNext(); }}>Continuar →</button>
      <p style={styles.loginLink}>¿Ya tienes cuenta?{' '}<Link href="/login" style={styles.link}>Inicia sesión</Link></p>
    </>
  );
}

function Step2({ formData, onChange, onNext, onPrev }: any) {
  const tipos = [
    { value: 'fisica', icon: '👤', title: 'Persona Física', desc: 'Profesionista independiente, freelancer o emprendedor individual' },
    { value: 'moral', icon: '🏢', title: 'Empresa', desc: 'Sociedad mercantil, civil o cualquier persona moral constituida' },
  ];
  return (
    <>
      <h2 style={styles.formTitle}>¿Cómo te registras?</h2>
      <p style={styles.formSubtitle}>Esto determina los documentos que necesitarás para verificar tu cuenta</p>
      <div style={styles.tipoGrid}>
        {tipos.map((t) => (
          <div key={t.value} style={{ ...styles.tipoCard, ...(formData.tipoPersona === t.value ? styles.tipoCardSelected : {}) }}
            onClick={() => onChange({ target: { name: 'tipoPersona', value: t.value } })}>
            <div style={styles.tipoIcon}>{t.icon}</div>
            <div style={{ ...styles.tipoTitle, color: formData.tipoPersona === t.value ? COLORS.primary : COLORS.gray900 }}>{t.title}</div>
            <div style={styles.tipoDesc}>{t.desc}</div>
          </div>
        ))}
      </div>
      <button style={{ ...styles.btnPrimary, opacity: !formData.tipoPersona ? 0.5 : 1, cursor: !formData.tipoPersona ? 'not-allowed' : 'pointer' }}
        onClick={() => { if (formData.tipoPersona) onNext(); }}>Continuar →</button>
      <button style={styles.btnSecondary} onClick={onPrev}>← Regresar</button>
    </>
  );
}

function Step3({ formData, onPrev }: any) {
  return (
    <div style={styles.successContainer}>
      <div style={styles.successIcon}>✉️</div>
      <h2 style={{ ...styles.formTitle, textAlign: 'center' }}>¡Revisa tu correo!</h2>
      <p style={{ ...styles.formSubtitle, textAlign: 'center', marginBottom: '32px' }}>
        Enviamos un enlace de verificación a <strong style={{ color: COLORS.primary }}>{formData.email}</strong>. Haz clic en el enlace para activar tu cuenta.
      </p>
      <div style={{ backgroundColor: COLORS.primaryLight, borderRadius: '12px', padding: '16px', marginBottom: '28px', fontSize: '13px', color: COLORS.gray600, lineHeight: '1.6', textAlign: 'left' }}>
        💡 <strong>¿No ves el correo?</strong> Revisa tu carpeta de spam. Puede tardar hasta 2 minutos.
      </div>
      <button style={styles.btnPrimary} onClick={() => window.location.href = '/login'}>Ir a iniciar sesión</button>
      <button style={styles.btnSecondary} onClick={onPrev}>← Cambiar datos</button>
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '', tipoPersona: '' });
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const stepLabels = ['Datos', 'Tipo', 'Verificar'];

  return (
    <>
      <Head>
        <title>Crear cuenta — snap.</title>
        <meta name="description" content="Crea tu cuenta en SNAP — Sistema Nacional de Proveedores" />
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
            <h2 style={styles.leftTitle}>Conecta con los mejores proveedores de México</h2>
            <p style={styles.leftDesc}>Únete a la plataforma que transforma las relaciones comerciales B2B y B2C en México.</p>
            <div style={styles.featureList}>
              {['Directorio de proveedores verificados', 'Solicitudes de cotización en minutos', 'Chat directo con proveedores', 'Licitaciones y concursos de proyectos'].map((f) => (
                <div key={f} style={styles.featureItem}><div style={styles.featureDot} />{f}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.formWrapper}>
            <div style={{ marginBottom: '32px' }}>
              <div style={styles.stepsRow}>
                {stepLabels.map((label, i) => {
                  const s = i + 1;
                  return (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ ...styles.stepCircle, backgroundColor: step >= s ? COLORS.primary : COLORS.gray200, color: step >= s ? COLORS.white : COLORS.gray400 }}>
                          {step > s ? '✓' : s}
                        </div>
                        <span style={{ ...styles.stepLabel, color: step >= s ? COLORS.primary : COLORS.gray400 }}>{label}</span>
                      </div>
                      {s < 3 && <div style={{ ...styles.stepLine, flex: 1, backgroundColor: step > s ? COLORS.primary : COLORS.gray200, marginBottom: '16px' }} />}
                    </div>
                  );
                })}
              </div>
            </div>
            {step === 1 && <Step1 formData={formData} onChange={handleChange} onNext={() => setStep(2)} />}
            {step === 2 && <Step2 formData={formData} onChange={handleChange} onNext={() => setStep(3)} onPrev={() => setStep(1)} />}
            {step === 3 && <Step3 formData={formData} onPrev={() => setStep(2)} />}
          </div>
        </div>
      </div>
    </>
  );
}
