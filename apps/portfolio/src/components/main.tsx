import Image from 'next/image';

type UserProps = {
    user: {
      display_name: string;
      occupation: string;
      images: Record<string, string>;
      url: string;
    } | null;  
  };
  
  export default function Main({user}: UserProps){
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Perfil do Behance</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <Image
              src={user.images['276']}
              alt={user.display_name}
              width={96}
              height={96}
              className="rounded-full"
              placeholder="blur"
              blurDataURL={user.images['276']}
            />
            <div>
              <h2 className="text-2xl">{user.display_name}</h2>
              <p>{user.occupation}</p>
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Visitar perfil
              </a>
            </div>
          </div>
        ) : (
          <p className="text-red-400">Erro ao carregar o perfil.</p>
        )}
      </div>
    );
  }

