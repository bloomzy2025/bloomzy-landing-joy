
"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #1E5D41, #0A2B1E)",
        opacity: 0.9, // Slightly reduced opacity
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      {/* Add a subtle vignette effect for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-64"></div>
    </div>
  )
}
