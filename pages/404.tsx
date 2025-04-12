import Link from "next/link";

export default function Custom404() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl mb-6 text-gray-300">
        The page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go Back Home
        </button>
      </Link>
    </main>
  );
}
