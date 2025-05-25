"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, AlertCircle, Wrench, User } from "lucide-react"

interface Transformer {
  id: number
  name: string
  location: string
  status: string
}

interface MaintenanceOverviewProps {
  transformers: Transformer[]
}

export default function MaintenanceOverview({ transformers }: MaintenanceOverviewProps) {
  const maintenanceSchedule = [
    {
      transformer: "TR-001",
      task: "Quarterly Inspection",
      dueDate: "2024-02-15",
      assignee: "John Smith",
      status: "scheduled",
    },
    {
      transformer: "TR-002",
      task: "Annual Overhaul",
      dueDate: "2024-01-20",
      assignee: "Sarah Johnson",
      status: "overdue",
    },
    {
      transformer: "TR-004",
      task: "Emergency Repair",
      dueDate: "2024-01-25",
      assignee: "Mike Davis",
      status: "in_progress",
    },
    { transformer: "TR-003", task: "Oil Change", dueDate: "2024-02-01", assignee: "John Smith", status: "scheduled" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />
    }
  }

  const totalTasks = maintenanceSchedule.length
  const completedTasks = maintenanceSchedule.filter((task) => task.status === "completed").length
  const overdueTasks = maintenanceSchedule.filter((task) => task.status === "overdue").length
  const completionRate = (completedTasks / totalTasks) * 100

  return (
    <div className="space-y-6">
      {/* Maintenance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Wrench className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(0)}%</div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <User className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Technicians on duty</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Maintenance</CardTitle>
          <CardDescription>Scheduled maintenance tasks and current progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenanceSchedule.map((task, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="flex-shrink-0">{getStatusIcon(task.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{task.task}</h4>
                  {getStatusBadge(task.status)}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {task.transformer} - Due: {task.dueDate}
                </p>
                <div className="flex items-center space-x-2">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{task.assignee}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button variant="outline" size="sm">
                  View Task
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Schedule Maintenance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Wrench className="w-6 h-6" />
              <span>Emergency Repair</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <CheckCircle className="w-6 h-6" />
              <span>Complete Task</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
