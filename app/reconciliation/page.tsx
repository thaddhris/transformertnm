"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, MapPin, Clock, CheckCircle, AlertTriangle, Camera, Download } from "lucide-react"
import Link from "next/link"

const reconciliationData = [
  {
    id: 1,
    transformer: "TR-001",
    location: "Downtown Substation",
    lastReconciled: "2024-01-15",
    reconciler: "John Smith",
    status: "up-to-date",
    gpsCoords: "40.7128, -74.0060",
    daysSince: 10,
  },
  {
    id: 2,
    transformer: "TR-002",
    location: "Industrial Park",
    lastReconciled: "2023-12-20",
    reconciler: "Sarah Johnson",
    status: "missing",
    gpsCoords: "40.7589, -73.9851",
    daysSince: 36,
  },
  {
    id: 3,
    transformer: "TR-003",
    location: "Residential Area",
    lastReconciled: "2024-01-18",
    reconciler: "Mike Davis",
    status: "up-to-date",
    gpsCoords: "40.7505, -73.9934",
    daysSince: 7,
  },
  {
    id: 4,
    transformer: "TR-004",
    location: "Commercial District",
    lastReconciled: "2023-11-15",
    reconciler: "John Smith",
    status: "overdue",
    gpsCoords: "40.7614, -73.9776",
    daysSince: 71,
  },
]

const recentReconciliations = [
  {
    id: 1,
    transformer: "TR-003",
    timestamp: "2024-01-18 14:30",
    reconciler: "Mike Davis",
    location: "Residential Area",
    gpsVerified: true,
    photos: 3,
  },
  {
    id: 2,
    transformer: "TR-001",
    timestamp: "2024-01-15 09:15",
    reconciler: "John Smith",
    location: "Downtown Substation",
    gpsVerified: true,
    photos: 2,
  },
  {
    id: 3,
    transformer: "TR-002",
    timestamp: "2023-12-20 16:45",
    reconciler: "Sarah Johnson",
    location: "Industrial Park",
    gpsVerified: false,
    photos: 1,
  },
]

export default function ReconciliationPage() {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false)
  const [selectedTransformer, setSelectedTransformer] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "up-to-date":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Up to Date</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      case "missing":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Missing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up-to-date":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "overdue":
        return <Clock className="w-4 h-4 text-red-600" />
      case "missing":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const handleReconciliation = (transformerId: string) => {
    // Simulate reconciliation process
    console.log(`Reconciling transformer ${transformerId}`)
    setSelectedTransformer(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Asset Reconciliation</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scan">QR Scanner</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                  <QrCode className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reconciliationData.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Up to Date</CardTitle>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {reconciliationData.filter((item) => item.status === "up-to-date").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                  <Clock className="w-4 h-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {reconciliationData.filter((item) => item.status === "overdue").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Missing</CardTitle>
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {reconciliationData.filter((item) => item.status === "missing").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reconciliation Status Table */}
            <Card>
              <CardHeader>
                <CardTitle>Reconciliation Status</CardTitle>
                <CardDescription>Track physical verification of transformer assets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transformer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Reconciled</TableHead>
                      <TableHead>Days Since</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reconciler</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reconciliationData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.transformer}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{item.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.lastReconciled}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(item.status)}
                            <span className={item.daysSince > 30 ? "text-red-600" : "text-gray-600"}>
                              {item.daysSince} days
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{item.reconciler}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedTransformer(item.transformer)}>
                              <QrCode className="w-4 h-4 mr-1" />
                              Scan
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
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

          <TabsContent value="scan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
                <CardDescription>Scan transformer QR codes to perform reconciliation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* QR Scanner */}
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
                      <QrCode className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-600 text-center mb-4">Point your camera at the transformer QR code</p>
                      <Button>
                        <Camera className="w-4 h-4 mr-2" />
                        Start Scanner
                      </Button>
                    </div>
                  </div>

                  {/* Manual Entry */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Manual Entry</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">QR Code / Transformer ID</label>
                        <input
                          type="text"
                          placeholder="Enter QR code or transformer ID"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button className="w-full">Look Up Transformer</Button>
                    </div>

                    {selectedTransformer && (
                      <div className="mt-6 p-4 border rounded-lg bg-blue-50">
                        <h4 className="font-semibold mb-2">Transformer Found: {selectedTransformer}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Confirm the physical presence and condition of this transformer
                        </p>
                        <div className="space-y-3">
                          <Button className="w-full" onClick={() => handleReconciliation(selectedTransformer)}>
                            Confirm Reconciliation
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => setSelectedTransformer(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reconciliation History</CardTitle>
                <CardDescription>Recent reconciliation activities and verifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Transformer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reconciler</TableHead>
                      <TableHead>GPS Verified</TableHead>
                      <TableHead>Photos</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReconciliations.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.timestamp}</TableCell>
                        <TableCell className="font-medium">{record.transformer}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{record.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{record.reconciler}</TableCell>
                        <TableCell>
                          {record.gpsVerified ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.photos} photos</Badge>
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

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reconciliation Reports</CardTitle>
                <CardDescription>
                  Generate and download reconciliation reports by site, region, or time period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weekly Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Reconciliation status for the past week</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Missing Assets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Report of assets that haven't been reconciled</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Site Compliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Compliance rates by site and region</p>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Excel
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
