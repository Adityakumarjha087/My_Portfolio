import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page with projects section
    router.push('/#projects');
  }, [router]);

  return null;
}