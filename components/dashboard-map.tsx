"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Settings, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import LeafletMap from "./leaflet-map"

interface Transformer {
  id: number
  name: string
  location: string
  lat: number
  lng: number
  status: string
  battery: number
  signal: number
}

interface DashboardMapProps {
  transformers: Transformer[]
}

export default function DashboardMap({ transformers }: DashboardMapProps) {
  const [selectedTransformer, setSelectedTransformer] = useState<string>("all")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const filteredTransformers =
    selectedTransformer === "all" ? transformers : transformers.filter((t) => t.id.toString() === selectedTransformer)

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="live" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="live">Live View</TabsTrigger>
          <TabsTrigger value="track">Track View</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="flex-1 relative">
          <div className="h-[480px]">
            <LeafletMap transformers={transformers} />
          </div>
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2 z-10">
            <Button variant="secondary" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Map Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="track" className="flex-1 flex flex-col space-y-4">
          {/* Track View Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg flex-shrink-0">
            <div className="space-y-2">
              <Label htmlFor="transformer-select">Transformer</Label>
              <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transformer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transformers</SelectItem>
                  {transformers.map((transformer) => (
                    <SelectItem key={transformer.id} value={transformer.id.toString()}>
                      {transformer.name} - {transformer.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Track View Map */}
          <div className="relative flex-1 min-h-0">
            <LeafletMap transformers={filteredTransformers} />
            {/* Map Controls */}
            <div className="absolute top-4 right-4 space-y-2 z-10">
              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Track Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
