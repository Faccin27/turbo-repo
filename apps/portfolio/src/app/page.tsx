import { Suspense } from 'react';
import Main from "@/components/main";
import { scrapeBehanceUser } from '@/utils/fetchBehanceUser';
import Loading from '@/components/loading';

// Array de usuários que queremos buscar
const USERS = ['guizeradesigner', 'Guilherme', 'Joao'];

// Componente que busca dados de um único usuário
async function UserProfile({ username }: { username: string }) {
  const user = await scrapeBehanceUser(username);
  
  return <Main user={user} />;
}

export default async function Home() {
  return (
    <div className="space-y-8">
      {USERS.map(username => (
        <Suspense key={username} fallback={<Loading />}>
          <UserProfile username={username} />
        </Suspense>
      ))}
    </div>
  );
}
