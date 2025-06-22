"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonitoringSetup } from "@/components/monitoring-setup"
import { AnalyticsExport } from "@/components/analytics-export"
import { MLModelTraining } from "@/components/ml-model-training"
import { NewIntegrations } from "@/components/new-integrations"
import { AlertRules } from "@/components/alert-rules"

export default function MonitoringDashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Monitoring & Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive monitoring, analytics, ML training, integrations, and alerting management
        </p>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Export</TabsTrigger>
          <TabsTrigger value="ml-training">ML Training</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="alerts">Alert Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring">
          <MonitoringSetup />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsExport />
        </TabsContent>

        <TabsContent value="ml-training">
          <MLModelTraining />
        </TabsContent>

        <TabsContent value="integrations">
          <NewIntegrations />
        </TabsContent>

        <TabsContent value="alerts">
          <AlertRules />
        </TabsContent>
      </Tabs>
    </div>
  )
}
