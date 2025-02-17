export default function Loading() {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold mb-4">Carregando perfil...</h1>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-700 rounded-full"/>
            <div>
              <div className="h-8 w-48 bg-gray-700 rounded mb-2"/>
              <div className="h-4 w-32 bg-gray-700 rounded"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  