"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap, Calendar, Bell, CheckCircle, Clock } from "lucide-react"
import DashboardMap from "@/components/dashboard-map"
import AlertsPanel from "@/components/alerts-panel"
import TransformersModule from "@/components/transformers-module"
import MaintenanceModule from "@/components/maintenance-module"
import ReconciliationModule from "@/components/reconciliation-module"
import UsersModule from "@/components/users-module"

// Mock data with Maharashtra locations and Indian names
const transformers = [
  {
    id: 1,
    name: "TR-001",
    location: "Pune Substation",
    lat: 18.5204,
    lng: 73.8567,
    status: "online",
    battery: 85,
    signal: 4,
  },
  {
    id: 2,
    name: "TR-002",
    location: "Aurangabad Industrial Park",
    lat: 19.8762,
    lng: 75.3433,
    status: "alert",
    battery: 65,
    signal: 3,
  },
  {
    id: 3,
    name: "TR-003",
    location: "Nashik Residential Area",
    lat: 19.9975,
    lng: 73.7898,
    status: "online",
    battery: 92,
    signal: 5,
  },
  {
    id: 4,
    name: "TR-004",
    location: "Mumbai Commercial District",
    lat: 19.076,
    lng: 72.8777,
    status: "maintenance",
    battery: 78,
    signal: 4,
  },
]

const alerts = [
  {
    id: 1,
    type: "geofence",
    message: "TR-002 moved outside designated area in Aurangabad",
    timestamp: new Date(),
    severity: "high",
  },
  {
    id: 2,
    type: "maintenance",
    message: "TR-004 maintenance overdue in Mumbai",
    timestamp: new Date(Date.now() - 3600000),
    severity: "medium",
  },
  {
    id: 3,
    type: "battery",
    message: "TR-002 low battery warning in Aurangabad",
    timestamp: new Date(Date.now() - 7200000),
    severity: "low",
  },
  {
    id: 4,
    type: "tamper",
    message: "TR-003 GPS sensor tamper attempt detected in Nashik",
    timestamp: new Date(Date.now() - 1800000),
    severity: "high",
  },
]

export default function Dashboard() {
  const [user] = useState({ role: "admin", name: "Rajesh Patil" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({
    totalTransformers: 4,
    onlineTransformers: 2,
    alertsCount: 3,
    maintenanceOverdue: 1,
  })

  const onlinePercentage = (stats.onlineTransformers / stats.totalTransformers) * 100

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "transformers", label: "Transformers" },
    { id: "maintenance", label: "Maintenance" },
    { id: "reconciliation", label: "Reconciliation" },
    { id: "users", label: "Users" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transformers Online</CardTitle>
                  <Zap className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8/10</div>
                  <p className="text-xs text-muted-foreground">80% operational</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">MTTR (This Month)</CardTitle>
                  <Clock className="w-4 h-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3d 4h</div>
                  <p className="text-xs text-green-600">11% LOWER than last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm">Overdue</span>
                      </div>
                      <span className="text-lg font-bold text-red-600">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Next 7 Days</span>
                      </div>
                      <span className="text-lg font-bold text-yellow-600">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Transformer Reconciliation
                    <div className="text-xs text-gray-500 font-normal mt-1">
                      No. of transformers checked after last maintenance
                    </div>
                  </CardTitle>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">88%</div>
                  <p className="text-xs text-green-600">12% higher than last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Map Section - Takes 2/3 of the space */}
              <div className="lg:col-span-2">
                <Card className="h-[700px]">
                  <CardHeader>
                    <CardTitle>Transformer Locations</CardTitle>
                    <CardDescription>Real-time GPS tracking and status monitoring</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 h-[calc(100%-80px)]">
                    <DashboardMap transformers={transformers} />
                  </CardContent>
                </Card>
              </div>

              {/* Alerts Section - Takes 1/3 of the space */}
              <div className="lg:col-span-1">
                <div className="h-[700px]">
                  <AlertsPanel alerts={alerts} />
                </div>
              </div>
            </div>
          </>
        )
      case "transformers":
        return <TransformersModule />
      case "maintenance":
        return <MaintenanceModule />
      case "reconciliation":
        return <ReconciliationModule />
      case "users":
        return <UsersModule />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Transformer Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              <span className="text-sm text-gray-600">{user.name}</span>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>
    </div>
  )
}
