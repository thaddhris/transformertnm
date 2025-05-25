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
import { Plus, Search, QrCode, MapPin, Battery, Calendar, Settings, Edit } from "lucide-react"

const transformers = [
  {
    id: 1,
    name: "TR-001",
    location: "Pune Substation",
    type: "Distribution",
    installDate: "2023-01-15",
    qrCode: "QR001",
    gpsId: "GPS001",
    status: "online",
    battery: 85,
    signal: 4,
    lastMaintenance: "2024-01-10",
  },
  {
    id: 2,
    name: "TR-002",
    location: "Aurangabad Industrial Park",
    type: "Power",
    installDate: "2023-03-20",
    qrCode: "QR002",
    gpsId: "GPS002",
    status: "alert",
    battery: 65,
    signal: 3,
    lastMaintenance: "2023-12-15",
  },
  {
    id: 3,
    name: "TR-003",
    location: "Nashik Residential Area",
    type: "Distribution",
    installDate: "2023-06-10",
    qrCode: "QR003",
    gpsId: "GPS003",
    status: "online",
    battery: 92,
    signal: 5,
    lastMaintenance: "2024-01-05",
  },
  {
    id: 4,
    name: "TR-004",
    location: "Mumbai Commercial District",
    type: "Power",
    installDate: "2023-08-25",
    qrCode: "QR004",
    gpsId: "GPS004",
    status: "maintenance",
    battery: 78,
    signal: 4,
    lastMaintenance: "2023-11-20",
  },
]

export default function TransformersModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTransformers = transformers.filter((transformer) => {
    const matchesSearch =
      transformer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transformer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transformer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
      case "alert":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alert</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>
      default:
        return <Badge variant="secondary">Offline</Badge>
    }
  }

  const getSignalBars = (signal: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 ${i < signal ? "bg-green-500" : "bg-gray-300"} ${
          i === 0 ? "h-2" : i === 1 ? "h-3" : i === 2 ? "h-4" : i === 3 ? "h-5" : "h-6"
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transformers..."
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
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Transformer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Transformer</DialogTitle>
              <DialogDescription>Enter the details for the new transformer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Transformer Name</Label>
                <Input id="name" placeholder="TR-005" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Installation location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distribution">Distribution</SelectItem>
                    <SelectItem value="power">Power</SelectItem>
                    <SelectItem value="isolation">Isolation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpsId">GPS Tracker ID</Label>
                <Input id="gpsId" placeholder="GPS005" />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Add Transformer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transformers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transformers ({filteredTransformers.length})</CardTitle>
          <CardDescription>Manage and monitor all transformer assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Signal</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransformers.map((transformer) => (
                <TableRow key={transformer.id}>
                  <TableCell className="font-medium">{transformer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{transformer.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transformer.type}</TableCell>
                  <TableCell>{getStatusBadge(transformer.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4 text-gray-400" />
                      <span>{transformer.battery}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">{getSignalBars(transformer.signal)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{transformer.lastMaintenance}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
