import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-archtyp-bg-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-archtyp-text-primary mb-4">404</h1>
        <p className="text-xl text-archtyp-text-secondary mb-8">Page Not Found</p>
        <Link href="/" className="text-archtyp-purple-primary hover:text-archtyp-purple-light transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}