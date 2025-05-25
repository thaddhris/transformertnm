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
import { Plus, Search, Settings, Edit, Mail, Phone } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Rajesh Patil",
    email: "rajesh.patil@company.com",
    phone: "+91 98765 43210",
    role: "admin",
    department: "Operations",
    status: "active",
    lastLogin: "2024-01-20",
    createdDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "+91 87654 32109",
    role: "supervisor",
    department: "Field Services",
    status: "active",
    lastLogin: "2024-01-19",
    createdDate: "2023-08-22",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@company.com",
    phone: "+91 76543 21098",
    role: "technician",
    department: "Field Services",
    status: "active",
    lastLogin: "2024-01-18",
    createdDate: "2023-09-10",
  },
  {
    id: 4,
    name: "Sneha Desai",
    email: "sneha.desai@company.com",
    phone: "+91 65432 10987",
    role: "technician",
    department: "Maintenance",
    status: "inactive",
    lastLogin: "2023-12-15",
    createdDate: "2023-04-05",
  },
]

const rolePermissions = {
  admin: ["All permissions", "User management", "System settings", "Reports"],
  supervisor: ["View all data", "Assign maintenance", "Generate reports", "Manage team"],
  technician: ["View assigned work", "Submit maintenance", "QR scanning", "Update status"],
}

export default function UsersModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
      case "supervisor":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Supervisor</Badge>
      case "technician":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Technician</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <CardTitle>System Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="user@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="technician">Technician</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="field-services">Field Services</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddUserDialogOpen(false)} className="flex-1">
                        Add User
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-sm">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
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

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Overview of permissions assigned to each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <Card key={role} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base capitalize">{role}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {permissions.map((permission, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-sm">{permission}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
