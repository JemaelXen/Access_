"use client"

import { Button } from "@/components/ui/button"
import { Check, Clock, X } from "lucide-react"

export function PartnershipRequests() {
  const partnerships = [
    {
      id: 1,
      company: "Global Fashion Week",
      type: "Fashion & Culture",
      proposal: "Official technology partner for all Fashion Week events globally",
      value: "$2.4M",
      status: "Pending Review",
    },
    {
      id: 2,
      company: "TechSummit International",
      type: "Technology",
      proposal: "Headline sponsor for global tech conference series",
      value: "$1.8M",
      status: "Approved",
    },
    {
      id: 3,
      company: "World Business Forum",
      type: "Business",
      proposal: "Strategic partner for executive networking events",
      value: "$3.2M",
      status: "Pending Review",
    },
    {
      id: 4,
      company: "Global Music Awards",
      type: "Entertainment",
      proposal: "Exclusive digital platform partner for awards ceremony",
      value: "$4.5M",
      status: "Approved",
    },
    {
      id: 5,
      company: "International Film Festival",
      type: "Entertainment",
      proposal: "Official streaming partner for film premieres",
      value: "$2.7M",
      status: "Rejected",
    },
    {
      id: 6,
      company: "Asian Business Summit",
      type: "Business",
      proposal: "Lead technology partner for pan-Asian business conference",
      value: "$1.9M",
      status: "Pending Review",
    },
  ]

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 text-sm font-medium">Company</th>
            <th className="text-left p-2 text-sm font-medium">Type</th>
            <th className="text-left p-2 text-sm font-medium">Proposal</th>
            <th className="text-left p-2 text-sm font-medium">Value</th>
            <th className="text-left p-2 text-sm font-medium">Status</th>
            <th className="text-left p-2 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partnerships.map((partnership) => (
            <tr key={partnership.id} className="border-b">
              <td className="p-2 text-sm">
                <div className="flex items-center gap-2">{partnership.company}</div>
              </td>
              <td className="p-2 text-sm">{partnership.type}</td>
              <td className="p-2 text-sm max-w-xs truncate">{partnership.proposal}</td>
              <td className="p-2 text-sm">{partnership.value}</td>
              <td className="p-2 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    partnership.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : partnership.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {partnership.status}
                </span>
              </td>
              <td className="p-2 text-sm">
                <div className="flex space-x-2">
                  {partnership.status === "Pending Review" ? (
                    <>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
