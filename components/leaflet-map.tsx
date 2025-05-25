"use client"

import { useEffect, useRef } from "react"

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

interface LeafletMapProps {
  transformers: Transformer[]
  onTransformerSelect?: (transformer: Transformer) => void
}

export default function LeafletMap({ transformers, onTransformerSelect }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const getSignalBars = (signal: number) => {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<div style="display: inline-block; width: 3px; height: ${(i + 1) * 2 + 4}px; background-color: ${i < signal ? "#10b981" : "#d1d5db"}; margin-right: 1px;"></div>`,
    ).join("")
  }

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Dynamically import Leaflet to avoid SSR issues
      import("leaflet").then((L) => {
        // Import Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }

        // Initialize map centered on Maharashtra
        const map = L.map(mapRef.current!).setView([19.7515, 75.7139], 7)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Custom marker icons based on status
        const getMarkerIcon = (status: string) => {
          const color =
            status === "online" ? "green" : status === "alert" ? "red" : status === "maintenance" ? "orange" : "gray"

          return L.divIcon({
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            className: "custom-marker",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })
        }

        // Add markers for each transformer
        transformers.forEach((transformer) => {
          const marker = L.marker([transformer.lat, transformer.lng], {
            icon: getMarkerIcon(transformer.status),
          }).addTo(map)

          // Create enhanced popup content with all details
          const statusColor =
            transformer.status === "online" ? "#10b981" : transformer.status === "alert" ? "#ef4444" : "#f59e0b"
          const popupContent = `
  <div style="padding: 8px; min-width: 200px; max-width: 220px;">
    <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 6px 0; color: #1f2937;">${transformer.name}</h3>
    <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">${transformer.location}</p>
    
    <div style="margin-bottom: 8px;">
      <span style="display: inline-block; padding: 2px 6px; border-radius: 8px; font-size: 11px; font-weight: 500; color: white; background-color: ${statusColor};">
        ${transformer.status.charAt(0).toUpperCase() + transformer.status.slice(1)}
      </span>
    </div>
    
    <div style="space-y: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13"></rect>
            <path d="m16 8 4-4-4-4"></path>
          </svg>
          <span style="font-size: 12px; color: #374151;">Battery</span>
        </div>
        <span style="font-size: 12px; font-weight: 500; color: #1f2937;">${transformer.battery}%</span>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11l.85 1.95L6.8 13l-1.95.85L4 15.8l-.85-1.95L1.2 13l1.95-.85zm6.7-6.7L10.7 5l.85 1.95L13.5 7l-1.95.85L10.7 9.8 9.85 7.85 7.9 7l1.95-.85zm6.7 6.7L17.4 11l.85 1.95L20.2 13l-1.95.85L17.4 15.8l-.85-1.95L14.6 13l1.95-.85z"></path>
          </svg>
          <span style="font-size: 12px; color: #374151;">Signal</span>
        </div>
        <div style="display: flex; align-items: center; gap: 2px;">
          ${getSignalBars(transformer.signal)}
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span style="font-size: 12px; color: #374151;">GPS</span>
        </div>
        <span style="font-size: 10px; color: #6b7280;">${transformer.lat.toFixed(4)}, ${transformer.lng.toFixed(4)}</span>
      </div>
    </div>
    
    <div style="display: flex; gap: 6px; margin-top: 8px;">
      <button style="flex: 1; padding: 4px 8px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;">
        Details
      </button>
      <button style="flex: 1; padding: 4px 8px; background-color: transparent; color: #3b82f6; border: 1px solid #3b82f6; border-radius: 4px; font-size: 11px; cursor: pointer;">
        History
      </button>
    </div>
  </div>
`

          marker.bindPopup(popupContent, {
            maxWidth: 250,
            className: "custom-popup",
          })

          // Handle marker click
          marker.on("click", () => {
            if (onTransformerSelect) {
              onTransformerSelect(transformer)
            }
          })
        })

        mapInstanceRef.current = map
      })
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [transformers, onTransformerSelect])

  return <div ref={mapRef} className="w-full h-full rounded-lg" />
}
