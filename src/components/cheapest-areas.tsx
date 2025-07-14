import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProperties } from '@/data/mockData'
import { MapPin, TrendingDown } from 'lucide-react'

export function CheapestAreas() {
  // Calculate average price per district
  const areaStats = mockProperties.reduce((acc, property) => {
    const key = `${property.city}-${property.district}`
    if (!acc[key]) {
      acc[key] = {
        city: property.city,
        district: property.district,
        prices: [],
        count: 0
      }
    }
    acc[key].prices.push(property.price)
    acc[key].count++
    return acc
  }, {} as Record<string, any>)

  const cheapestAreas = Object.values(areaStats)
    .map((area: any) => ({
      ...area,
      avgPrice: Math.round(area.prices.reduce((sum: number, price: number) => sum + price, 0) / area.prices.length),
      pricePerSqm: Math.round((area.prices.reduce((sum: number, price: number) => sum + price, 0) / area.prices.length) / 80) // Assuming avg 80sqm
    }))
    .sort((a, b) => a.avgPrice - b.avgPrice)
    .slice(0, 8)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getBadgeVariant = (index: number) => {
    if (index === 0) return 'default' // Most affordable
    if (index <= 2) return 'secondary'
    return 'outline'
  }

  return (
    <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-success" />
          Most Affordable Areas
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Districts with the lowest average property prices
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cheapestAreas.map((area, index) => (
            <div 
              key={`${area.city}-${area.district}`}
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-success/5 border hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{area.district}</span>
                    <Badge variant={getBadgeVariant(index)} className="text-xs">
                      {area.city}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {area.count} properties available
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-success">
                  {formatPrice(area.avgPrice)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatPrice(area.pricePerSqm)}/m²
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}