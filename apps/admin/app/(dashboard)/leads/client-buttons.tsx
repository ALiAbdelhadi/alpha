"use client"

import { FileDown, ExternalLink } from "lucide-react"

export function ExportCsvButton({ leads }: { leads: any[] }) {
  const handleExport = () => {
    const headers = [
      "Timestamp", "Name", "Phone", "Project Type", "Timeline",
      "Complexity", "Price Min", "Price Max"
    ]
    
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => [
        `"${new Date(lead.createdAt).toISOString()}"`,
        `"${lead.name || 'Anonymous'}"`,
        `"${lead.phone || ''}"`,
        `"${lead.projectType || ''}"`,
        `"${lead.timeline || ''}"`,
        `"${lead.complexity || ''}"`,
        lead.priceMin,
        lead.priceMax
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 rounded-sm border border-foreground/10 bg-foreground/5 font-mono text-[10px] uppercase tracking-wider text-primary/60 hover:text-primary transition-colors flex items-center gap-2"
    >
      <FileDown className="h-3 w-3" />
      Export CSV
    </button>
  )
}

export function ViewDetailsButton({ lead }: { lead: any }) {
  const handleClick = () => {
    alert(JSON.stringify(lead, null, 2))
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-sm border border-foreground/10 bg-foreground/5 text-primary/40 hover:text-primary hover:bg-foreground/10 transition-all duration-200"
      title="View Raw Details"
    >
      <ExternalLink className="h-4 w-4" />
    </button>
  )
}
