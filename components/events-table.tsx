"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface EventsTableProps {
  fullView?: boolean
}

export function EventsTable({ fullView = false }: EventsTableProps) {
  const events = [
    {
      id: 1,
      name: "World Economic Forum",
      type: "Business & Economic",
      location: "Davos, Switzerland",
      date: "Jan 15-19, 2024",
      status: "Invitation Sent",
    },
    {
      id: 2,
      name: "United Nations General Assembly",
      type: "Diplomatic",
      location: "New York, USA",
      date: "Sep 19-23, 2024",
      status: "Confirmed",
    },
    {
      id: 3,
      name: "G20 Summit",
      type: "Diplomatic",
      location: "Rio de Janeiro, Brazil",
      date: "Nov 18-19, 2024",
      status: "Application Pending",
    },
    {
      id: 4,
      name: "Paris Fashion Week",
      type: "Fashion & Culture",
      location: "Paris, France",
      date: "Sep 23-Oct 1, 2024",
      status: "Confirmed",
    },
  ]

  const displayEvents = fullView ? events : events.slice(0, 4)

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 text-sm font-medium">Event</th>
            <th className="text-left p-2 text-sm font-medium">Type</th>
            <th className="text-left p-2 text-sm font-medium">Location</th>
            <th className="text-left p-2 text-sm font-medium">Date</th>
            <th className="text-left p-2 text-sm font-medium">Status</th>
            <th className="text-left p-2 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayEvents.map((event) => (
            <tr key={event.id} className="border-b">
              <td className="p-2 text-sm">{event.name}</td>
              <td className="p-2 text-sm">{event.type}</td>
              <td className="p-2 text-sm">{event.location}</td>
              <td className="p-2 text-sm">{event.date}</td>
              <td className="p-2 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    event.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : event.status === "Invitation Sent"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {event.status}
                </span>
              </td>
              <td className="p-2 text-sm">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!fullView && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View All Events
          </Button>
        </div>
      )}
    </div>
  )
}
