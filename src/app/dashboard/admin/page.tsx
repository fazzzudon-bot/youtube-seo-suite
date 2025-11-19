"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Server,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

interface HealthStatus {
  status: string
  message: string
  metrics: {
    totalRequests: number
    successfulRequests: number
    failedRequests: number
    averageResponseTime: number
    errorRate: number
    isHealthy: boolean
    circuitBreakerOpen: boolean
  }
  recentErrors: Array<{
    timestamp: number
    endpoint: string
    error: string
  }>
  uptime: number
}

export default function AdminDashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [resetting, setResetting] = useState(false)

  const fetchHealth = async () => {
    try {
      const res = await fetch("/api/health")
      const data = await res.json()
      setHealth(data)
    } catch (error) {
      console.error("Failed to fetch health:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetCircuitBreaker = async () => {
    setResetting(true)
    try {
      await fetch("/api/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      })
      await fetchHealth()
    } catch (error) {
      console.error("Failed to reset:", error)
    } finally {
      setResetting(false)
    }
  }

  useEffect(() => {
    fetchHealth()
    const interval = setInterval(fetchHealth, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const statusColor =
    health?.status === "healthy"
      ? "text-green-500"
      : health?.status === "degraded"
        ? "text-yellow-500"
        : "text-red-500"

  const uptime = health?.uptime || 0
  const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">AI Health Monitoring & System Status</p>
        </div>
        <Button onClick={fetchHealth} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Status Overview */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            {health?.status === "healthy" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${statusColor}`}>
              {health?.status || "Unknown"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{health?.message}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health?.metrics.totalRequests || 0}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {health?.metrics.successfulRequests || 0} successful
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((health?.metrics.errorRate || 0) * 100).toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              {health?.metrics.failedRequests || 0} failed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uptimeFormatted}</div>
            <p className="text-xs text-muted-foreground mt-1">Since last restart</p>
          </CardContent>
        </Card>
      </div>

      {/* Circuit Breaker Status */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Circuit Breaker</CardTitle>
              <CardDescription>AI request gating and fallback control</CardDescription>
            </div>
            <Button
              onClick={resetCircuitBreaker}
              disabled={resetting || !health?.metrics.circuitBreakerOpen}
              variant={health?.metrics.circuitBreakerOpen ? "default" : "outline"}
            >
              {resetting ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              Reset Circuit Breaker
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">State</span>
              <Badge variant={health?.metrics.circuitBreakerOpen ? "destructive" : "default"}>
                {health?.metrics.circuitBreakerOpen ? "OPEN (Using Fallback)" : "CLOSED (AI Active)"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-sm">{health?.metrics.averageResponseTime.toFixed(0)}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Health Status</span>
              <Badge variant={health?.metrics.isHealthy ? "default" : "destructive"}>
                {health?.metrics.isHealthy ? "Healthy" : "Unhealthy"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>Last 5 API failures</CardDescription>
        </CardHeader>
        <CardContent>
          {health?.recentErrors && health.recentErrors.length > 0 ? (
            <div className="space-y-4">
              {health.recentErrors.map((error, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-sm">{error.endpoint}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {error.error}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="mx-auto h-12 w-12 mb-2 text-green-500" />
              <p>No errors recorded</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
