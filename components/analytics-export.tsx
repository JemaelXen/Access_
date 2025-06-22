"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  BarChart3,
  CalendarIcon,
  Clock,
  Activity,
  TrendingUp,
  Database,
  Mail,
  Share2,
  Settings,
} from "lucide-react"
import { format } from "date-fns"

interface ExportJob {
  id: string
  name: string
  type: "pdf" | "excel" | "csv" | "json"
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  createdAt: Date
  completedAt?: Date
  downloadUrl?: string
  size?: string
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  metrics: string[]
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
  enabled: boolean
}

export function AnalyticsExport() {
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([
    {
      id: "job-1",
      name: "Executive Summary Q4 2024",
      type: "pdf",
      status: "completed",
      progress: 100,
      createdAt: new Date(Date.now() - 3600000),
      completedAt: new Date(Date.now() - 3000000),
      downloadUrl: "/exports/executive-summary-q4-2024.pdf",
      size: "2.4 MB",
    },
    {
      id: "job-2",
      name: "Performance Metrics December",
      type: "excel",
      status: "processing",
      progress: 67,
      createdAt: new Date(Date.now() - 1800000),
    },
    {
      id: "job-3",
      name: "User Analytics Raw Data",
      type: "csv",
      status: "completed",
      progress: 100,
      createdAt: new Date(Date.now() - 7200000),
      completedAt: new Date(Date.now() - 6900000),
      downloadUrl: "/exports/user-analytics-raw.csv",
      size: "15.7 MB",
    },
  ])

  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([
    {
      id: "template-1",
      name: "Executive Dashboard",
      description: "High-level KPIs and business metrics for leadership",
      category: "Executive",
      metrics: ["Revenue", "User Growth", "System Performance", "Security Status"],
      frequency: "weekly",
      enabled: true,
    },
    {
      id: "template-2",
      name: "Technical Performance Report",
      description: "Detailed system performance and infrastructure metrics",
      category: "Technical",
      metrics: ["API Response Times", "Error Rates", "Uptime", "Resource Usage"],
      frequency: "daily",
      enabled: true,
    },
    {
      id: "template-3",
      name: "Security Compliance Report",
      description: "Security events, compliance status, and risk assessment",
      category: "Security",
      metrics: ["Security Events", "Compliance Score", "Vulnerability Status", "Access Logs"],
      frequency: "monthly",
      enabled: false,
    },
  ])

  const [exportConfig, setExportConfig] = useState({
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
    format: "pdf",
    includeCharts: true,
    includeRawData: false,
    emailDelivery: true,
    recipients: ["admin@projectaccess.com"],
  })

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "System Performance",
    "User Analytics",
    "Revenue Metrics",
    "Security Events",
  ])

  const availableMetrics = [
    "System Performance",
    "User Analytics",
    "Revenue Metrics",
    "Security Events",
    "API Usage",
    "Database Performance",
    "Integration Health",
    "Error Rates",
    "Response Times",
    "User Engagement",
    "Conversion Rates",
    "Traffic Sources",
  ]

  useEffect(() => {
    // Simulate export job progress updates
    const interval = setInterval(() => {
      setExportJobs((prev) =>
        prev.map((job) => {
          if (job.status === "processing" && job.progress < 100) {
            const newProgress = Math.min(100, job.progress + Math.random() * 10)
            return {
              ...job,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "processing",
              completedAt: newProgress === 100 ? new Date() : undefined,
              downloadUrl:
                newProgress === 100 ? `/exports/${job.name.toLowerCase().replace(/\s+/g, "-")}.${job.type}` : undefined,
              size: newProgress === 100 ? `${(Math.random() * 10 + 1).toFixed(1)} MB` : undefined,
            }
          }
          return job
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "excel":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "csv":
        return <Database className="h-4 w-4 text-blue-500" />
      case "json":
        return <Activity className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const handleCreateExport = () => {
    const newJob: ExportJob = {
      id: `job-${Date.now()}`,
      name: `Custom Export ${format(new Date(), "MMM dd, yyyy")}`,
      type: exportConfig.format as any,
      status: "processing",
      progress: 0,
      createdAt: new Date(),
    }
    setExportJobs((prev) => [newJob, ...prev])
  }

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const completedJobs = exportJobs.filter((job) => job.status === "completed").length
  const processingJobs = exportJobs.filter((job) => job.status === "processing").length
  const totalSize = exportJobs
    .filter((job) => job.size)
    .reduce((sum, job) => sum + Number.parseFloat(job.size!.split(" ")[0]), 0)

  return (
    <div className="space-y-6">
      {/* Export Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Exports</CardTitle>
            <Download className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedJobs}</div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{processingJobs}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <Database className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
            <p className="text-xs text-muted-foreground">Exported data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Reports</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportTemplates.filter((t) => t.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Scheduled reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Management Tabs */}
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Export</TabsTrigger>
          <TabsTrigger value="jobs">Export Jobs</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="schedule">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Create Custom Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Date Range Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportConfig.dateRange.from ? format(exportConfig.dateRange.from, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportConfig.dateRange.from}
                          onSelect={(date) =>
                            date &&
                            setExportConfig({ ...exportConfig, dateRange: { ...exportConfig.dateRange, from: date } })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportConfig.dateRange.to ? format(exportConfig.dateRange.to, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportConfig.dateRange.to}
                          onSelect={(date) =>
                            date &&
                            setExportConfig({ ...exportConfig, dateRange: { ...exportConfig.dateRange, to: date } })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <Label>Export Format</Label>
                  <Select
                    value={exportConfig.format}
                    onValueChange={(value) => setExportConfig({ ...exportConfig, format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Metrics Selection */}
                <div>
                  <Label>Select Metrics to Include</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {availableMetrics.map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Checkbox
                          id={metric}
                          checked={selectedMetrics.includes(metric)}
                          onCheckedChange={() => handleMetricToggle(metric)}
                        />
                        <Label htmlFor={metric} className="text-sm">
                          {metric}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-charts"
                      checked={exportConfig.includeCharts}
                      onCheckedChange={(checked) =>
                        setExportConfig({ ...exportConfig, includeCharts: checked as boolean })
                      }
                    />
                    <Label htmlFor="include-charts">Include charts and visualizations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-raw-data"
                      checked={exportConfig.includeRawData}
                      onCheckedChange={(checked) =>
                        setExportConfig({ ...exportConfig, includeRawData: checked as boolean })
                      }
                    />
                    <Label htmlFor="include-raw-data">Include raw data tables</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-delivery"
                      checked={exportConfig.emailDelivery}
                      onCheckedChange={(checked) =>
                        setExportConfig({ ...exportConfig, emailDelivery: checked as boolean })
                      }
                    />
                    <Label htmlFor="email-delivery">Send via email when ready</Label>
                  </div>
                </div>

                {/* Email Recipients */}
                {exportConfig.emailDelivery && (
                  <div>
                    <Label htmlFor="recipients">Email Recipients</Label>
                    <Input
                      id="recipients"
                      value={exportConfig.recipients.join(", ")}
                      onChange={(e) =>
                        setExportConfig({
                          ...exportConfig,
                          recipients: e.target.value.split(",").map((email) => email.trim()),
                        })
                      }
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </div>
                )}

                <Button onClick={handleCreateExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Create Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Export Jobs ({exportJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getFormatIcon(job.type)}
                        <div>
                          <h3 className="font-medium">{job.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created: {job.createdAt.toLocaleString()}
                            {job.completedAt && ` • Completed: ${job.completedAt.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>{job.status.toUpperCase()}</Badge>
                        {job.size && <Badge variant="outline">{job.size}</Badge>}
                      </div>
                    </div>

                    {job.status === "processing" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{job.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {job.status === "completed" && job.downloadUrl && (
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      {job.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge
                          className={template.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {template.enabled ? "ENABLED" : "DISABLED"}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Included Metrics:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.metrics.map((metric, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Frequency: {template.frequency}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit Template
                      </Button>
                      <Button size="sm" variant="outline">
                        Generate Now
                      </Button>
                      <Button size="sm" variant={template.enabled ? "destructive" : "default"}>
                        {template.enabled ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {reportTemplates.filter((t) => t.enabled && t.frequency === "daily").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Daily Reports</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {reportTemplates.filter((t) => t.enabled && t.frequency === "weekly").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Weekly Reports</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {reportTemplates.filter((t) => t.enabled && t.frequency === "monthly").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Reports</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Upcoming Scheduled Reports</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Technical Performance Report</p>
                        <p className="text-sm text-muted-foreground">Daily • Next run: Tomorrow 6:00 AM</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">SCHEDULED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Executive Dashboard</p>
                        <p className="text-sm text-muted-foreground">Weekly • Next run: Monday 8:00 AM</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">SCHEDULED</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Security Compliance Report</p>
                        <p className="text-sm text-muted-foreground">Monthly • Next run: January 1st</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">DISABLED</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
