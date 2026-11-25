import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy-900">Page Not Found</h1>
        <p className="text-slate-600 mt-2">The page you're looking for doesn't exist.</p>
        <Link href="/" className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-medium">
          Go back home
        </Link>
      </div>
    </div>
  );
}
