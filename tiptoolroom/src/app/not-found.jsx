"use client"
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
 const router = useRouter();

 const handleRedirect = () => {
    router.push('/');
 };

 return (
  <div style={{
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <h1 style={{ color: '#333', fontSize: '48px', marginBottom: '20px' }}>404 - Page Not Found</h1>
    <p style={{ color: '#666', fontSize: '24px', marginBottom: '30px' }}>The page you are looking for does not exist.</p>
    <button
      onClick={handleRedirect}
      style={{
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}
    >
      Return to Home
    </button>
  </div>
 );
}
