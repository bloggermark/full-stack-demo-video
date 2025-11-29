export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Developer Journal
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Welcome to my personal space where I document my coding journey, share
          insights, and explore new technologies.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            📝 Latest Posts
          </h3>
          <p className="text-gray-600 mb-4">
            Discover my recent thoughts on web development, programming
            challenges, and tech discoveries.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Explore Blog →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            🚀 Projects
          </h3>
          <p className="text-gray-600 mb-4">
            Check out my latest projects, experiments, and open-source
            contributions.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            View Portfolio →
          </a>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join the Journey
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with my latest posts and coding adventures.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Subscribe to Updates
        </button>
      </div>
    </div>
  )
}
