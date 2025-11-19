"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  RefreshCw,
  Download,
  Shield,
  BarChart3,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface HealthMetrics {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  lastSuccessTime: number | null
  lastFailureTime: number | null
  errorRate: number
  isHealthy: boolean
  circuitBreakerOpen: boolean
}

interface ErrorLog {
  timestamp: number
  endpoint: string
  error: string
  statusCode?: number
  requestData?: any
}

export default function AdminPage() {
  const [healthStatus, setHealthStatus] = useState<{
    status: "healthy" | "degraded" | "unhealthy"
    message: string
    metrics: HealthMetrics
    recentErrors: ErrorLog[]
    timestamp: string
    uptime: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchHealthStatus = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealthStatus(data)
    } catch (error) {
      console.error("Failed to fetch health status:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const resetHealthMetrics = async () => {
    try {
      await fetch("/api/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      })
      fetchHealthStatus()
    } catch (error) {
      console.error("Failed to reset metrics:", error)
    }
  }

  const exportLogs = () => {
    if (!healthStatus) return
    const dataStr = JSON.stringify(healthStatus.recentErrors, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ai-logs-${new Date().toISOString()}.json`
    link.click()
  }

  useEffect(() => {
    fetchHealthStatus()
    // Refresh every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "unhealthy":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5" />
      case "degraded":
        return <AlertCircle className="h-5 w-5" />
      case "unhealthy":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <Skeleton className="mb-2 h-10 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor AI health, view logs, and manage system settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchHealthStatus} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      {healthStatus && (
        <>
          <div className="mb-6 flex items-center gap-4 rounded-lg border bg-card p-4">
            <div className={getStatusColor(healthStatus.status)}>
              {getStatusIcon(healthStatus.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">System Status:</h2>
                <Badge
                  variant={
                    healthStatus.status === "healthy"
                      ? "default"
                      : healthStatus.status === "degraded"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {healthStatus.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{healthStatus.message}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Uptime: {Math.floor(healthStatus.uptime / 60)} minutes</div>
              <div>Last updated: {new Date(healthStatus.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{healthStatus.metrics.totalRequests}</div>
                <p className="text-xs text-muted-foreground">
                  Success: {healthStatus.metrics.successfulRequests} | Failed:{" "}
                  {healthStatus.metrics.failedRequests}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(healthStatus.metrics.errorRate * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthStatus.metrics.errorRate < 0.1
                    ? "Excellent performance"
                    : healthStatus.metrics.errorRate < 0.3
                    ? "Some issues detected"
                    : "High error rate"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus.metrics.averageResponseTime > 0
                    ? Math.round(healthStatus.metrics.averageResponseTime)
                    : 0}
                  ms
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthStatus.metrics.averageResponseTime < 1000
                    ? "Fast responses"
                    : healthStatus.metrics.averageResponseTime < 3000
                    ? "Acceptable speed"
                    : "Slow responses"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circuit Breaker</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus.metrics.circuitBreakerOpen ? (
                    <Badge variant="destructive">OPEN</Badge>
                  ) : (
                    <Badge variant="default">CLOSED</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthStatus.metrics.circuitBreakerOpen
                    ? "Using fallback system"
                    : "Normal operation"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="logs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="logs">
                <BarChart3 className="mr-2 h-4 w-4" />
                Error Logs
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Zap className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Error Logs</CardTitle>
                  <CardDescription>
                    Last {healthStatus.recentErrors.length} errors from AI services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {healthStatus.recentErrors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="mb-2 h-12 w-12 text-green-500" />
                      <p className="font-semibold">No errors recorded</p>
                      <p className="text-sm text-muted-foreground">
                        All AI services are running smoothly
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {healthStatus.recentErrors.map((error, index) => (
                          <div
                            key={index}
                            className="rounded-lg border bg-muted/50 p-4"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <Badge variant="destructive">{error.endpoint}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(error.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="mb-2 text-sm font-medium">{error.error}</p>
                            {error.statusCode && (
                              <p className="text-xs text-muted-foreground">
                                Status Code: {error.statusCode}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Manage AI health monitoring and system configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">Reset Health Metrics</h3>
                      <p className="text-sm text-muted-foreground">
                        Clear all recorded metrics and start fresh
                      </p>
                    </div>
                    <Button variant="destructive" onClick={resetHealthMetrics}>
                      Reset
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-semibold">Current Configuration</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Error Threshold:</span>
                        <span className="font-mono">50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Circuit Breaker Timeout:</span>
                        <span className="font-mono">60 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Retries:</span>
                        <span className="font-mono">3 attempts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fallback System:</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Activity className="h-4 w-4" />
                      Health Monitoring Active
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      AI services are being monitored in real-time. Circuit breaker will automatically
                      activate if error rate exceeds 50%, ensuring continuous service through fallback
                      generators.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
