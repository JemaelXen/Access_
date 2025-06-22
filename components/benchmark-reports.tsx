"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Download, Calendar, FileText, BarChart3, Award } from "lucide-react"

export function BenchmarkReports() {
  const reports = [
    {
      title: "Q4 2024 Performance Benchmark Report",
      date: "December 2024",
      type: "Quarterly",
      status: "Latest",
      description: "Comprehensive analysis of integration performance vs industry standards",
      metrics: ["Response Time", "Uptime", "Throughput", "Error Rates"],
      highlights: [
        "Achieved #1 ranking in FinTech sector",
        "19% improvement in response times",
        "99.97% uptime maintained",
      ],
      downloadUrl: "#",
    },
    {
      title: "Annual Integration Benchmark 2024",
      date: "January 2025",
      type: "Annual",
      status: "New",
      description: "Year-end comprehensive benchmark analysis with industry trends",
      metrics: ["All Performance Metrics", "Market Position", "Competitive Analysis"],
      highlights: [
        "Top 5% performer across all categories",
        "23.4% year-over-year growth",
        "Industry leadership in reliability",
      ],
      downloadUrl: "#",
    },
    {
      title: "Security & Compliance Benchmark",
      date: "November 2024",
      type: "Specialized",
      status: "Available",
      description: "Security posture analysis against industry security standards",
      metrics: ["Security Score", "Compliance Status", "Vulnerability Assessment"],
      highlights: ["SOC 2 Type II certified", "Zero critical vulnerabilities", "94/100 security score"],
      downloadUrl: "#",
    },
    {
      title: "Developer Experience Benchmark",
      date: "October 2024",
      type: "Specialized",
      status: "Available",
      description: "Analysis of developer tools, documentation, and SDK quality",
      metrics: ["Documentation Quality", "SDK Coverage", "Support Response"],
      highlights: [
        "8 programming languages supported",
        "2.3h average support response",
        "85% documentation completeness",
      ],
      downloadUrl: "#",
    },
  ]

  const customReports = [
    {
      name: "Executive Summary",
      description: "High-level overview for C-suite and board presentations",
      format: "PDF",
      pages: "4-6",
      frequency: "Monthly",
    },
    {
      name: "Technical Deep Dive",
      description: "Detailed technical analysis for engineering teams",
      format: "PDF + Excel",
      pages: "15-20",
      frequency: "Quarterly",
    },
    {
      name: "Competitive Intelligence",
      description: "Market positioning and competitive analysis",
      format: "PDF",
      pages: "8-12",
      frequency: "Quarterly",
    },
    {
      name: "Compliance Report",
      description: "Security and regulatory compliance status",
      format: "PDF",
      pages: "6-10",
      frequency: "Monthly",
    },
  ]

  const scheduledReports = [
    {
      name: "Weekly Performance Summary",
      nextDelivery: "Every Monday 9:00 AM",
      recipients: "Engineering Team",
      format: "Email + Dashboard",
    },
    {
      name: "Monthly Executive Brief",
      nextDelivery: "1st of each month",
      recipients: "C-Suite",
      format: "PDF Report",
    },
    {
      name: "Quarterly Benchmark Analysis",
      nextDelivery: "End of quarter",
      recipients: "All Stakeholders",
      format: "Comprehensive Report",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Latest":
        return "border-green-400 text-green-300 bg-green-500/10"
      case "New":
        return "border-blue-400 text-blue-300 bg-blue-500/10"
      case "Available":
        return "border-purple-400 text-purple-300 bg-purple-500/10"
      default:
        return "border-gray-400 text-gray-300 bg-gray-500/10"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quarterly":
        return "border-blue-400 text-blue-300"
      case "Annual":
        return "border-purple-400 text-purple-300"
      case "Specialized":
        return "border-orange-400 text-orange-300"
      default:
        return "border-gray-400 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Available Reports */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Available Benchmark Reports
            </CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{report.date}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    <Badge variant="outline" className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{report.description}</p>

                <div className="mb-3">
                  <h4 className="text-xs font-medium text-blue-300 mb-2">Covered Metrics</h4>
                  <div className="flex flex-wrap gap-1">
                    {report.metrics.map((metric, metricIndex) => (
                      <Badge key={metricIndex} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-medium text-green-300 mb-2">Key Highlights</h4>
                  <ul className="space-y-1">
                    {report.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-300">
                  <Download className="w-3 h-3 mr-2" />
                  Download Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Custom Report Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customReports.map((template, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{template.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-gray-300">{template.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Length:</span>
                    <span className="text-gray-300">{template.pages} pages</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frequency:</span>
                    <span className="text-gray-300">{template.frequency}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-blue-400 text-blue-300">
                    Generate Now
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-purple-400 text-purple-300">
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledReports.map((schedule, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{schedule.name}</h3>
                    <Badge variant="outline" className="border-green-400 text-green-300">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Delivery:</span>
                      <span>{schedule.nextDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recipients:</span>
                      <span>{schedule.recipients}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Format:</span>
                      <span>{schedule.format}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5" />
              Report Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Performance Trends</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Consistent improvement across all metrics over the past quarter
                </p>
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  +5.2 points overall score
                </Badge>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">Market Position</h4>
                <p className="text-sm text-gray-300 mb-2">Maintained #1 position in FinTech integration performance</p>
                <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                  Top 5% globally
                </Badge>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-1">Growth Metrics</h4>
                <p className="text-sm text-gray-300 mb-2">23.4% YoY growth outpacing industry average of 14.2%</p>
                <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                  65% above industry
                </Badge>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="font-medium text-orange-300 mb-1">Areas of Focus</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Developer experience and SDK coverage identified for improvement
                </p>
                <Badge variant="outline" className="border-orange-400 text-orange-300 text-xs">
                  Action required
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Configuration */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Distribution Settings</h4>
              <div className="space-y-3">
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-300">Email notifications</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-300">Dashboard alerts</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">Slack integration</span>
                  </label>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">Teams integration</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3">Report Preferences</h4>
              <div className="space-y-3">
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="block text-sm text-gray-300 mb-1">Default Format</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>PowerPoint</option>
                  </select>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="block text-sm text-gray-300 mb-1">Detail Level</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>Executive Summary</option>
                    <option>Standard</option>
                    <option>Detailed</option>
                  </select>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <label className="block text-sm text-gray-300 mb-1">Time Zone</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="border-gray-400 text-gray-300">
              Reset to Defaults
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
