import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
