import Link from "next/link";

const Tabs = () => {
  return (
    <div className="flex gap-4 p-4 bg-gray-800 text-white">
      <Link href="http://localhost:3001">
        <button className="p-2 bg-blue-500 rounded">Projeto 1</button>
      </Link>
      <Link href="http://localhost:3002">
        <button className="p-2 bg-green-500 rounded">Projeto 2</button>
      </Link>
    </div>
  );
};

export default Tabs;
