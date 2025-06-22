"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Monitor,
  FileText,
  Settings,
  Download,
} from "lucide-react"

export function TestingEnvironment() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [selectedTest, setSelectedTest] = useState("integration-flow")

  const testSuites = [
    {
      id: "integration-flow",
      name: "Integration Flow Test",
      description: "Test complete integration workflow",
      tests: 12,
      duration: "2.3s",
      status: "passed",
    },
    {
      id: "webhook-validation",
      name: "Webhook Validation",
      description: "Validate webhook signature and payload",
      tests: 8,
      duration: "1.1s",
      status: "passed",
    },
    {
      id: "error-handling",
      name: "Error Handling",
      description: "Test error scenarios and recovery",
      tests: 15,
      duration: "3.7s",
      status: "warning",
    },
    {
      id: "performance",
      name: "Performance Test",
      description: "Load testing and performance metrics",
      tests: 6,
      duration: "45.2s",
      status: "running",
    },
  ]

  const mockTestResults = [
    {
      id: "1",
      name: "Post Created Trigger",
      status: "passed",
      duration: "145ms",
      message: "Webhook received and processed successfully",
      timestamp: "14:30:25",
    },
    {
      id: "2",
      name: "User Tier Validation",
      status: "passed",
      duration: "23ms",
      message: "Elite user tier detected correctly",
      timestamp: "14:30:25",
    },
    {
      id: "3",
      name: "Notification Dispatch",
      status: "passed",
      duration: "892ms",
      message: "Notification sent to 1,247 followers",
      timestamp: "14:30:26",
    },
    {
      id: "4",
      name: "Analytics Update",
      status: "warning",
      duration: "1.2s",
      message: "Analytics updated with minor delay",
      timestamp: "14:30:27",
    },
    {
      id: "5",
      name: "Rate Limit Check",
      status: "failed",
      duration: "56ms",
      message: "Rate limit exceeded for user tier",
      timestamp: "14:30:27",
    },
  ]

  const runTest = async (testId: string) => {
    setIsRunning(true)
    // Simulate test execution
    setTimeout(() => {
      setIsRunning(false)
      setTestResults(mockTestResults)
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "running":
        return <Clock className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "border-green-400 text-green-300"
      case "failed":
        return "border-red-400 text-red-300"
      case "warning":
        return "border-yellow-400 text-yellow-300"
      case "running":
        return "border-blue-400 text-blue-300"
      default:
        return "border-gray-400 text-gray-300"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Test Suites */}
      <div className="space-y-4">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Play className="w-5 h-5" />
              Test Suites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testSuites.map((suite) => (
              <div
                key={suite.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedTest === suite.id
                    ? "border-purple-400 bg-purple-400/10"
                    : "border-white/10 bg-black/20 hover:border-purple-400/50"
                }`}
                onClick={() => setSelectedTest(suite.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{suite.name}</h3>
                  {getStatusIcon(suite.status)}
                </div>
                <p className="text-sm text-gray-400 mb-2">{suite.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{suite.tests} tests</span>
                  <span>{suite.duration}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Controls */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Test Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => runTest(selectedTest)}
                disabled={isRunning}
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run Test"}
              </Button>
              <Button variant="outline" className="border-red-400 text-red-300" disabled={!isRunning}>
                <Pause className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" className="w-full border-purple-400 text-purple-300">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Environment
            </Button>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Test Environment</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm">
                <option value="sandbox">Sandbox</option>
                <option value="staging">Staging</option>
                <option value="production">Production (Read-only)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Test Results
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-green-400 text-green-300">
                  3 Passed
                </Badge>
                <Badge variant="outline" className="border-yellow-400 text-yellow-300">
                  1 Warning
                </Badge>
                <Badge variant="outline" className="border-red-400 text-red-300">
                  1 Failed
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {mockTestResults.map((result) => (
                <div key={result.id} className="p-3 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="font-medium text-white">{result.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{result.duration}</span>
                      <span>{result.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{result.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Configuration */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Test Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Test Payload</label>
                <Textarea
                  placeholder="Enter test payload JSON..."
                  className="bg-black/20 border-white/10 text-white resize-none font-mono text-sm"
                  rows={8}
                  defaultValue={JSON.stringify(
                    {
                      event: "post.created",
                      user: {
                        id: "user_123",
                        name: "John Doe",
                        tier: "elite",
                        followerCount: 1247,
                      },
                      post: {
                        id: "post_456",
                        type: "text",
                        content: "Hello from Project Access!",
                        timestamp: "2024-01-15T14:30:25Z",
                      },
                    },
                    null,
                    2,
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                  <FileText className="w-4 h-4 mr-1" />
                  Load Template
                </Button>
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-300">
                  <Download className="w-4 h-4 mr-1" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
