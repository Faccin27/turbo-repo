'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Algo deu errado!</h1>
      <p className="mb-4 text-red-400">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tentar novamente
      </button>
    </div>
  );
}