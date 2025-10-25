import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Check out our blog</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Read our latest articles on web development, React, and more.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
