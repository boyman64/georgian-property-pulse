import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, TrendingUp, MapPin, Activity } from 'lucide-react'
import { mockProperties, marketStats } from '@/data/mockData'

const HotZones = () => {
  // Calculate hot zones based on listing density and price trends
  const cityActivity = marketStats.topCities.map(city => ({
    ...city,
    demandLevel: city.count > 5 ? 'Very High' : city.count > 3 ? 'High' : 'Moderate',
    pricePerSqm: Math.round(city.avgPrice / 80), // Assuming avg 80sqm
    growthRate: Math.random() * 15 + 2, // Mock growth rate 2-17%
  })).sort((a, b) => b.count - a.count)

  // Get properties by district for demand analysis
  const districtActivity = mockProperties.reduce((acc, property) => {
    const key = `${property.city}-${property.district}`
    if (!acc[key]) {
      acc[key] = {
        city: property.city,
        district: property.district,
        count: 0,
        totalValue: 0,
        recentListings: []
      }
    }
    acc[key].count++
    acc[key].totalValue += property.price
    if (new Date(property.dateAdded) >= new Date('2024-07-01')) {
      acc[key].recentListings.push(property)
    }
    return acc
  }, {} as Record<string, any>)

  const hotDistricts = Object.values(districtActivity)
    .map((district: any) => ({
      ...district,
      avgPrice: Math.round(district.totalValue / district.count),
      velocity: district.recentListings.length,
      hotScore: (district.count * 0.4) + (district.recentListings.length * 0.6)
    }))
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, 8)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getDemandColor = (level: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (level) {
      case 'Very High': return 'destructive'
      case 'High': return 'secondary'
      case 'Moderate': return 'outline'
      default: return 'outline'
    }
  }

  const getHotLevel = (score: number): { level: string; color: "default" | "secondary" | "outline" | "destructive" } => {
    if (score >= 4) return { level: 'Extremely Hot', color: 'destructive' }
    if (score >= 3) return { level: 'Very Hot', color: 'secondary' }
    if (score >= 2) return { level: 'Hot', color: 'outline' }
    return { level: 'Warm', color: 'outline' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Zap className="h-10 w-10 text-warning" />
            Hot Zones & High Demand Areas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Identify the most active real estate markets in Georgia. 
            Discover areas with high listing volumes and strong buyer demand.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning mb-1">
                {mockProperties.filter(p => new Date(p.dateAdded) >= new Date('2024-07-01')).length}
              </div>
              <div className="text-sm text-muted-foreground">New listings this month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-destructive/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-destructive mb-1">
                {cityActivity[0]?.city || 'Tbilisi'}
              </div>
              <div className="text-sm text-muted-foreground">Hottest market</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-1">+8.5%</div>
              <div className="text-sm text-muted-foreground">Avg listing growth</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-primary/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">72h</div>
              <div className="text-sm text-muted-foreground">Avg time on market</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* City Demand Overview */}
          <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                🏙️ City Market Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Property listing volumes and market demand by city
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityActivity.map((city, index) => (
                  <div 
                    key={city.city}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-warning/10 border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/20 text-warning font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{city.city}</span>
                          <Badge variant={getDemandColor(city.demandLevel)}>
                            {city.demandLevel}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {city.count} active listings • +{city.growthRate.toFixed(1)}% growth
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(city.avgPrice)}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatPrice(city.pricePerSqm)}/m²
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hot Districts */}
          <Card className="bg-gradient-to-br from-card to-destructive/5 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                🔥 Hottest Districts
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Districts with highest activity and recent listing velocity
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotDistricts.map((district, index) => {
                  const hotLevel = getHotLevel(district.hotScore)
                  
                  return (
                    <div 
                      key={`${district.city}-${district.district}`}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-destructive/10 border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20 text-destructive font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{district.district}</span>
                            <Badge variant={hotLevel.color} className="text-xs">
                              {hotLevel.level}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {district.city} • {district.velocity} new this month
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(district.avgPrice)}</div>
                        <div className="text-xs text-muted-foreground">
                          {district.count} total listings
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Intelligence */}
        <Card className="mt-8 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold text-warning">Market Intelligence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">🎯 Investment Hotspots</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Vake district showing 25% increase in listings</li>
                  <li>• New Boulevard Batumi - luxury market surge</li>
                  <li>• Saburtalo emerging as tech hub</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">⚡ Market Velocity</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Properties selling 40% faster than Q1</li>
                  <li>• Apartment demand outpacing supply 3:1</li>
                  <li>• Commercial spaces in high demand</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📈 Price Momentum</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Tbilisi up 12% year-over-year</li>
                  <li>• Batumi coastal premium increasing</li>
                  <li>• Secondary cities gaining traction</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map Placeholder */}
        <Card className="mt-8 bg-gradient-to-br from-card to-primary/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">🗺️ Interactive Heat Map</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visual representation of market activity across Georgian regions
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-muted/20 to-primary/10 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Interactive Heat Map</p>
                <p className="text-sm">Real-time activity visualization coming soon</p>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Very High Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>High Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Moderate Activity</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HotZones