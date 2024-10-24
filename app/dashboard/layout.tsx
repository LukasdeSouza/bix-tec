'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardLayout = () => {
    const router = useRouter();

    useEffect(() => {
      const authToken = localStorage.getItem('auth_token_bix');
      
      if (!authToken) {
        router.push('/');
      }
    }, [router]);

  return (
    <div>
      <nav>
        <a href="/dashboard">Home</a>
        <a href="/dashboard/settings">Configurações</a>
        <a href="/dashboard/profile">Perfil</a>
      </nav>
    </div>
  );
}

export default DashboardLayout
