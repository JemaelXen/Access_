"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface MediaCoverageProps {
  fullView?: boolean
}

export function MediaCoverage({ fullView = false }: MediaCoverageProps) {
  const articles = [
    {
      id: 1,
      title: "Access&Co Revolutionizes Social Media with AI-Powered Platform",
      outlet: "TechCrunch",
      date: "July 12, 2024",
      region: "United States",
      type: "Feature",
    },
    {
      id: 2,
      title: "How Access&Co is Changing the Future of Digital Interaction",
      outlet: "Forbes",
      date: "July 10, 2024",
      region: "United States",
      type: "Interview",
    },
    {
      id: 3,
      title: "Access&Co Secures Major Partnerships with Global Brands",
      outlet: "Reuters",
      date: "July 8, 2024",
      region: "Global",
      type: "Press Release",
    },
    {
      id: 4,
      title: "The Rise of Access&Co: A New Era in Social Networking",
      outlet: "BBC",
      date: "July 5, 2024",
      region: "United Kingdom",
      type: "Feature",
    },
  ]

  const displayArticles = fullView ? articles : articles.slice(0, 4)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {displayArticles.map((article) => (
        <Card key={article.id} className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{article.outlet}</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{article.type}</span>
            </div>
            <h3 className="text-sm font-medium leading-tight mb-1">{article.title}</h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>{article.date}</div>
              <div>{article.region}</div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3 mr-1" />
                Read Article
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {!fullView && (
        <div className="md:col-span-2 mt-2 text-center">
          <Button variant="outline" size="sm">
            View All Media Coverage
          </Button>
        </div>
      )}
    </div>
  )
}
