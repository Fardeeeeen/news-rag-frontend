const mockArticles = [
  {
    id: 1,
    title: "Breakthroughs in Few-Shot Learning for Large Language Models",
    source: "AI Research Today",
    description: "Researchers achieve new efficiency records in training large language models with minimal data.",
    imageUrl: "/article1.png?height=200&width=300",
  },
  {
    id: 2,
    title: "European Offshore Wind Capacity Hits Record High",
    source: "Energy News",
    description: "European countries have significantly increased their offshore wind capacity in the past year.",
    imageUrl: "/article2.png?height=200&width=300",
  },
]

const RelevantArticles = ({ currentTopic }) => {
  return (
    <div className="hidden lg:block w-80 border-l border-gray-200 bg-white overflow-y-auto h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-900">Relevant Articles</h2>
      </div>

      <div className="p-4 space-y-4">
        {mockArticles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">{article.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{article.source}</p>
              <p className="text-xs text-gray-700 mt-2">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelevantArticles
