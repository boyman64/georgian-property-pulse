import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  className?: string
  trend?: "up" | "down" | "neutral"
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  className,
  trend = "neutral" 
}: StatCardProps) {
  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  const getTrendColor = () => {
    if (trend === "up" || (change && change > 0)) return "text-success"
    if (trend === "down" || (change && change < 0)) return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <Card className={cn(
      "bg-gradient-to-br from-card to-accent/5 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-primary">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change !== undefined && (
          <p className={cn("text-xs flex items-center gap-1 mt-1", getTrendColor())}>
            {formatChange(change)} from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}