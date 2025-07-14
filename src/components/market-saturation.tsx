import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProperties, marketStats } from '@/data/mockData'
import { Activity, AlertTriangle } from 'lucide-react'

export function MarketSaturation() {
  // Calculate market saturation by property type
  const propertyTypes = mockProperties.reduce((acc, property) => {
    acc[property.type] = (acc[property.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const saturationData = Object.entries(propertyTypes).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    percentage: Math.round((count / mockProperties.length) * 100)
  }))

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent-foreground))',
    'hsl(var(--success))',
    'hsl(var(--warning))'
  ]

  // Calculate city saturation levels
  const citySaturation = marketStats.topCities.map(city => ({
    ...city,
    saturationLevel: city.count > 5 ? 'High' : city.count > 3 ? 'Medium' : 'Low'
  }))

  const getSaturationColor = (level: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (level) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'secondary'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Card className="bg-gradient-to-br from-card to-primary/5 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Market Saturation Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Property supply distribution and market density
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Type Distribution */}
          <div>
            <h4 className="font-medium mb-3">Property Type Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={saturationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    labelLine={false}
                  >
                    {saturationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Properties']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* City Saturation Levels */}
          <div>
            <h4 className="font-medium mb-3">City Market Density</h4>
            <div className="space-y-3">
              {citySaturation.map((city) => (
                <div 
                  key={city.city}
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-primary/5 border"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{city.city}</span>
                      <Badge variant={getSaturationColor(city.saturationLevel)}>
                        {city.saturationLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {city.count} active listings
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatPrice(city.avgPrice)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      avg price
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary">Market Insights</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Highest Saturation:</span>
              <span className="ml-2 text-muted-foreground">
                {citySaturation.find(c => c.saturationLevel === 'High')?.city || 'Tbilisi'}
              </span>
            </div>
            <div>
              <span className="font-medium">Best Investment Opportunity:</span>
              <span className="ml-2 text-muted-foreground">
                {citySaturation.find(c => c.saturationLevel === 'Low')?.city || 'Emerging areas'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}