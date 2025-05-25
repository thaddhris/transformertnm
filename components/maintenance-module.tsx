"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, Search, Download } from "lucide-react"

const maintenancePlans = [
  {
    id: 1,
    name: "Quarterly Inspection",
    transformer: "TR-001",
    type: "Preventive",
    frequency: "Every 3 months",
    nextDue: "2024-02-15",
    assignedTo: "Rajesh Patil",
    status: "scheduled",
    checklist: ["Visual inspection", "Oil level check", "Temperature reading"],
  },
  {
    id: 2,
    name: "Annual Overhaul",
    transformer: "TR-002",
    type: "Preventive",
    frequency: "Yearly",
    nextDue: "2024-01-20",
    assignedTo: "Priya Sharma",
    status: "overdue",
    checklist: ["Complete teardown", "Coil inspection", "Bushing replacement"],
  },
  {
    id: 3,
    name: "Emergency Repair",
    transformer: "TR-004",
    type: "Reactive",
    frequency: "One-time",
    nextDue: "2024-01-25",
    assignedTo: "Amit Kumar",
    status: "in_progress",
    checklist: ["Fault diagnosis", "Component replacement", "Testing"],
  },
]

const maintenanceHistory = [
  {
    id: 1,
    transformer: "TR-001",
    date: "2024-01-10",
    performedBy: "Rajesh Patil",
    type: "Preventive",
    notes: "Routine inspection completed. All parameters normal.",
    status: "completed",
    images: 2,
  },
  {
    id: 2,
    transformer: "TR-003",
    date: "2024-01-05",
    performedBy: "Priya Sharma",
    type: "Preventive",
    notes: "Oil change and filter replacement. Minor leak detected and sealed.",
    status: "completed",
    images: 5,
  },
  {
    id: 3,
    transformer: "TR-002",
    date: "2023-12-15",
    performedBy: "Amit Kumar",
    type: "Reactive",
    notes: "Emergency repair - bushing replacement due to overheating.",
    status: "completed",
    images: 8,
  },
]

export default function MaintenanceModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false)

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

  return (
    <Tabs defaultValue="plans" className="space-y-6">
      <TabsList>
        <TabsTrigger value="plans">Maintenance Plans</TabsTrigger>
        <TabsTrigger value="history">Maintenance History</TabsTrigger>
        <TabsTrigger value="form">Quick Form</TabsTrigger>
      </TabsList>

      <TabsContent value="plans" className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search maintenance plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Maintenance Plan</DialogTitle>
                <DialogDescription>Schedule a new maintenance plan for a transformer</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input id="planName" placeholder="e.g., Quarterly Inspection" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transformer">Transformer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transformer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr-001">TR-001 - Pune Substation</SelectItem>
                      <SelectItem value="tr-002">TR-002 - Aurangabad Industrial Park</SelectItem>
                      <SelectItem value="tr-003">TR-003 - Nashik Residential Area</SelectItem>
                      <SelectItem value="tr-004">TR-004 - Mumbai Commercial District</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Maintenance Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="reactive">Reactive</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rajesh">Rajesh Patil</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                      <SelectItem value="amit">Amit Kumar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsAddPlanDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPlanDialogOpen(false)} className="flex-1">
                    Create Plan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Maintenance Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Maintenance Plans</CardTitle>
            <CardDescription>Scheduled and ongoing maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Transformer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenancePlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.transformer}</TableCell>
                    <TableCell>{plan.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(plan.status)}
                        <span>{plan.nextDue}</span>
                      </div>
                    </TableCell>
                    <TableCell>{plan.assignedTo}</TableCell>
                    <TableCell>{getStatusBadge(plan.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-6">
        {/* Filters and Export Section */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Options</CardTitle>
            <CardDescription>Filter maintenance history by date range and transformer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="transformerFilter">Transformer</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select transformer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transformers</SelectItem>
                      <SelectItem value="tr-001">TR-001 - Pune Substation</SelectItem>
                      <SelectItem value="tr-002">TR-002 - Aurangabad Industrial Park</SelectItem>
                      <SelectItem value="tr-003">TR-003 - Nashik Residential Area</SelectItem>
                      <SelectItem value="tr-004">TR-004 - Mumbai Commercial District</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationFilter">Duration</Label>
                  <Select defaultValue="last-30-days">
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Export</Label>
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder={
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </div>
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </div>
                    </SelectItem>
                    <SelectItem value="excel">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

        {/* Maintenance History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
            <CardDescription>Complete record of all maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transformer</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead className="w-24 text-center">
                    <div className="text-xs leading-tight">
                      Executed<br />Maintenance<br />Checklist
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell className="font-medium">{record.transformer}</TableCell>
                    <TableCell>{record.performedBy}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.images} photos</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" title="Download Maintenance Checklist">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="form" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Maintenance Form</CardTitle>
            <CardDescription>Submit maintenance work directly or via QR code scan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transformer">Transformer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transformer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr-001">TR-001 - Pune Substation</SelectItem>
                      <SelectItem value="tr-002">TR-002 - Aurangabad Industrial Park</SelectItem>
                      <SelectItem value="tr-003">TR-003 - Nashik Residential Area</SelectItem>
                      <SelectItem value="tr-004">TR-004 - Mumbai Commercial District</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceType">Maintenance Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="replacement">Replacement</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performedBy">Performed By</Label>
                  <Input id="performedBy" defaultValue="Current User" disabled />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Maintenance Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe the work performed, any issues found, and recommendations..."
                    rows={6}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Photo Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">Click to upload maintenance photos or drag and drop</p>
                  <Button variant="outline" className="mt-2">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
                <Button className="flex-1">Submit Maintenance Record</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
