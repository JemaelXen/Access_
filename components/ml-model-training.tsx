"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Database,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Activity,
  Target,
} from "lucide-react"

interface MLModel {
  id: string
  name: string
  type: string
  status: "idle" | "training" | "validating" | "deployed" | "failed"
  accuracy: number
  loss: number
  epochs: number
  maxEpochs: number
  trainingProgress: number
  lastTrained: Date
  datasetSize: number
  version: string
}

interface TrainingJob {
  id: string
  modelId: string
  modelName: string
  status: "queued" | "running" | "completed" | "failed"
  progress: number
  startTime: Date
  endTime?: Date
  accuracy: number
  loss: number
  logs: string[]
}

interface DatasetInfo {
  id: string
  name: string
  size: number
  features: number
  samples: number
  quality: number
  lastUpdated: Date
}

export function MLModelTraining() {
  const [models, setModels] = useState<MLModel[]>([
    {
      id: "capacity-predictor",
      name: "Capacity Predictor",
      type: "Time Series Forecasting",
      status: "deployed",
      accuracy: 94.2,
      loss: 0.058,
      epochs: 150,
      maxEpochs: 200,
      trainingProgress: 100,
      lastTrained: new Date(Date.now() - 86400000),
      datasetSize: 50000,
      version: "v2.1.0",
    },
    {
      id: "anomaly-detector",
      name: "Anomaly Detector",
      type: "Unsupervised Learning",
      status: "training",
      accuracy: 89.7,
      loss: 0.124,
      epochs: 75,
      maxEpochs: 100,
      trainingProgress: 75,
      lastTrained: new Date(Date.now() - 3600000),
      datasetSize: 75000,
      version: "v1.8.3",
    },
    {
      id: "user-behavior",
      name: "User Behavior Analyzer",
      type: "Classification",
      status: "validating",
      accuracy: 91.3,
      loss: 0.087,
      epochs: 200,
      maxEpochs: 200,
      trainingProgress: 100,
      lastTrained: new Date(Date.now() - 1800000),
      datasetSize: 120000,
      version: "v3.0.1",
    },
    {
      id: "performance-optimizer",
      name: "Performance Optimizer",
      type: "Reinforcement Learning",
      status: "idle",
      accuracy: 87.5,
      loss: 0.156,
      epochs: 0,
      maxEpochs: 300,
      trainingProgress: 0,
      lastTrained: new Date(Date.now() - 172800000),
      datasetSize: 25000,
      version: "v1.5.2",
    },
  ])

  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([
    {
      id: "job-1",
      modelId: "anomaly-detector",
      modelName: "Anomaly Detector",
      status: "running",
      progress: 75,
      startTime: new Date(Date.now() - 3600000),
      accuracy: 89.7,
      loss: 0.124,
      logs: [
        "Training started with 75,000 samples",
        "Epoch 1/100 - Loss: 0.245, Accuracy: 78.3%",
        "Epoch 25/100 - Loss: 0.156, Accuracy: 85.2%",
        "Epoch 50/100 - Loss: 0.134, Accuracy: 88.1%",
        "Epoch 75/100 - Loss: 0.124, Accuracy: 89.7%",
      ],
    },
    {
      id: "job-2",
      modelId: "user-behavior",
      modelName: "User Behavior Analyzer",
      status: "completed",
      progress: 100,
      startTime: new Date(Date.now() - 7200000),
      endTime: new Date(Date.now() - 1800000),
      accuracy: 91.3,
      loss: 0.087,
      logs: [
        "Training completed successfully",
        "Final accuracy: 91.3%",
        "Model validation passed",
        "Ready for deployment",
      ],
    },
  ])

  const [datasets, setDatasets] = useState<DatasetInfo[]>([
    {
      id: "system-metrics",
      name: "System Performance Metrics",
      size: 2.4,
      features: 45,
      samples: 50000,
      quality: 96.8,
      lastUpdated: new Date(Date.now() - 3600000),
    },
    {
      id: "user-interactions",
      name: "User Interaction Data",
      size: 8.7,
      features: 78,
      samples: 120000,
      quality: 94.2,
      lastUpdated: new Date(Date.now() - 7200000),
    },
    {
      id: "security-events",
      name: "Security Event Logs",
      size: 1.8,
      features: 32,
      samples: 75000,
      quality: 98.1,
      lastUpdated: new Date(Date.now() - 1800000),
    },
  ])

  const [trainingConfig, setTrainingConfig] = useState({
    batchSize: 32,
    learningRate: 0.001,
    epochs: 100,
    validationSplit: 0.2,
    earlyStoppingPatience: 10,
    enableGPU: true,
    enableDistributed: false,
  })

  useEffect(() => {
    // Simulate training progress updates
    const interval = setInterval(() => {
      setModels((prev) =>
        prev.map((model) => {
          if (model.status === "training" && model.trainingProgress < 100) {
            const newProgress = Math.min(100, model.trainingProgress + Math.random() * 5)
            const newEpochs = Math.floor((newProgress / 100) * model.maxEpochs)
            return {
              ...model,
              trainingProgress: newProgress,
              epochs: newEpochs,
              accuracy: model.accuracy + (Math.random() - 0.5) * 2,
              loss: Math.max(0.01, model.loss - Math.random() * 0.01),
              status: newProgress === 100 ? "validating" : "training",
            }
          }
          return model
        }),
      )

      setTrainingJobs((prev) =>
        prev.map((job) => {
          if (job.status === "running" && job.progress < 100) {
            const newProgress = Math.min(100, job.progress + Math.random() * 5)
            return {
              ...job,
              progress: newProgress,
              accuracy: job.accuracy + (Math.random() - 0.5) * 1,
              loss: Math.max(0.01, job.loss - Math.random() * 0.005),
              status: newProgress === 100 ? "completed" : "running",
              endTime: newProgress === 100 ? new Date() : undefined,
            }
          }
          return job
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800"
      case "training":
      case "running":
        return "bg-blue-100 text-blue-800"
      case "validating":
        return "bg-yellow-100 text-yellow-800"
      case "idle":
      case "queued":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "training":
      case "running":
        return <Play className="h-4 w-4 text-blue-500" />
      case "validating":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Pause className="h-4 w-4 text-gray-500" />
    }
  }

  const handleStartTraining = (modelId: string) => {
    setModels((prev) =>
      prev.map((model) =>
        model.id === modelId ? { ...model, status: "training", trainingProgress: 0, epochs: 0 } : model,
      ),
    )

    const model = models.find((m) => m.id === modelId)
    if (model) {
      const newJob: TrainingJob = {
        id: `job-${Date.now()}`,
        modelId,
        modelName: model.name,
        status: "running",
        progress: 0,
        startTime: new Date(),
        accuracy: 0,
        loss: 1.0,
        logs: [`Training started for ${model.name}`],
      }
      setTrainingJobs((prev) => [newJob, ...prev])
    }
  }

  const handleStopTraining = (modelId: string) => {
    setModels((prev) => prev.map((model) => (model.id === modelId ? { ...model, status: "idle" } : model)))
  }

  const activeTrainingJobs = trainingJobs.filter((job) => job.status === "running").length
  const completedJobs = trainingJobs.filter((job) => job.status === "completed").length
  const deployedModels = models.filter((model) => model.status === "deployed").length
  const avgAccuracy = models.reduce((sum, model) => sum + model.accuracy, 0) / models.length

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeTrainingJobs}</div>
            <p className="text-xs text-muted-foreground">Models in training</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployed Models</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deployedModels}</div>
            <p className="text-xs text-muted-foreground">Production ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Jobs</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedJobs}</div>
            <p className="text-xs text-muted-foreground">Completed this week</p>
          </CardContent>
        </Card>
      </div>

      {/* ML Training Tabs */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                ML Models ({models.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(model.status)}
                        <div>
                          <h3 className="font-medium">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                        <Badge variant="outline">{model.version}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Accuracy</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={model.accuracy} className="flex-1 h-2" />
                          <span className="font-medium">{model.accuracy.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Loss</p>
                        <p className="font-medium">{model.loss.toFixed(3)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Epochs</p>
                        <p className="font-medium">
                          {model.epochs}/{model.maxEpochs}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dataset Size</p>
                        <p className="font-medium">{model.datasetSize.toLocaleString()}</p>
                      </div>
                    </div>

                    {(model.status === "training" || model.status === "validating") && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Training Progress</span>
                          <span>{model.trainingProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={model.trainingProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last trained: {model.lastTrained.toLocaleDateString()}</span>
                    </div>

                    <div className="flex space-x-2">
                      {model.status === "idle" && (
                        <Button size="sm" onClick={() => handleStartTraining(model.id)}>
                          <Play className="h-3 w-3 mr-1" />
                          Start Training
                        </Button>
                      )}
                      {model.status === "training" && (
                        <Button size="sm" variant="destructive" onClick={() => handleStopTraining(model.id)}>
                          <Pause className="h-3 w-3 mr-1" />
                          Stop Training
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        View Metrics
                      </Button>
                      {model.status === "validating" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Deploy Model
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Training Jobs ({trainingJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="font-medium">{job.modelName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Started: {job.startTime.toLocaleString()}
                            {job.endTime && ` • Completed: ${job.endTime.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>{job.status.toUpperCase()}</Badge>
                    </div>

                    {job.status === "running" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{job.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Accuracy</p>
                        <p className="font-medium">{job.accuracy.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Loss</p>
                        <p className="font-medium">{job.loss.toFixed(3)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Training Logs:</p>
                      <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                        {job.logs.map((log, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            {log}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Download Logs
                      </Button>
                      {job.status === "running" && (
                        <Button size="sm" variant="destructive">
                          Cancel Job
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Training Datasets ({datasets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{dataset.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {dataset.lastUpdated.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{dataset.size} GB</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Samples</p>
                        <p className="font-medium">{dataset.samples.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Features</p>
                        <p className="font-medium">{dataset.features}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quality Score</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={dataset.quality} className="flex-1 h-2" />
                          <span className="font-medium">{dataset.quality.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Size</p>
                        <p className="font-medium">{dataset.size} GB</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Preprocess
                      </Button>
                      <Button size="sm" variant="outline">
                        Export Sample
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Upload New Dataset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Training Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="batch-size">Batch Size</Label>
                      <Input
                        id="batch-size"
                        type="number"
                        value={trainingConfig.batchSize}
                        onChange={(e) =>
                          setTrainingConfig({ ...trainingConfig, batchSize: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="learning-rate">Learning Rate</Label>
                      <Input
                        id="learning-rate"
                        type="number"
                        step="0.0001"
                        value={trainingConfig.learningRate}
                        onChange={(e) =>
                          setTrainingConfig({ ...trainingConfig, learningRate: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="epochs">Max Epochs</Label>
                      <Input
                        id="epochs"
                        type="number"
                        value={trainingConfig.epochs}
                        onChange={(e) =>
                          setTrainingConfig({ ...trainingConfig, epochs: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="validation-split">Validation Split</Label>
                      <Input
                        id="validation-split"
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={trainingConfig.validationSplit}
                        onChange={(e) =>
                          setTrainingConfig({ ...trainingConfig, validationSplit: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="early-stopping">Early Stopping Patience</Label>
                      <Input
                        id="early-stopping"
                        type="number"
                        value={trainingConfig.earlyStoppingPatience}
                        onChange={(e) =>
                          setTrainingConfig({
                            ...trainingConfig,
                            earlyStoppingPatience: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable GPU Acceleration</Label>
                        <p className="text-sm text-muted-foreground">Use GPU for faster training</p>
                      </div>
                      <Switch
                        checked={trainingConfig.enableGPU}
                        onCheckedChange={(checked) => setTrainingConfig({ ...trainingConfig, enableGPU: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Distributed Training</Label>
                        <p className="text-sm text-muted-foreground">Train across multiple nodes</p>
                      </div>
                      <Switch
                        checked={trainingConfig.enableDistributed}
                        onCheckedChange={(checked) =>
                          setTrainingConfig({ ...trainingConfig, enableDistributed: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Hardware Resources</Label>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-green-50 rounded">
                          <p className="font-medium">GPU Available</p>
                          <p className="text-muted-foreground">NVIDIA A100</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded">
                          <p className="font-medium">Memory</p>
                          <p className="text-muted-foreground">64 GB RAM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Training Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
