"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Battery, MapPin, Bell, CheckCircle, Check } from "lucide-react"

interface Alert {
  id: number
  type: string
  message: string
  timestamp: Date
  severity: string
}

interface AlertsPanelProps {
  alerts: Alert[]
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "geofence":
        return <MapPin className="w-4 h-4 text-red-600" />
      case "maintenance":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "battery":
        return <Battery className="w-4 h-4 text-orange-600" />
      case "tamper":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  return (
    <div className="space-y-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Active Alerts ({alerts.length})</CardTitle>
          <CardDescription>Real-time system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 flex-1 flex flex-col justify-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <p>No active alerts</p>
              <p className="text-sm">All systems are operating normally</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 flex flex-col justify-start">
              {alerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg ${
                    index === alerts.length - 1 ? "flex-1" : ""
                  }`}
                  style={index === alerts.length - 1 ? { minHeight: "120px" } : {}}
                >
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 capitalize">
                        {alert.type.replace("_", " ")} Alert
                      </h4>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</p>
                  </div>
                  <div className="flex-shrink-0 space-x-2 flex items-start">
                    <Button variant="ghost" size="sm" className="p-2" title="Acknowledge">
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
