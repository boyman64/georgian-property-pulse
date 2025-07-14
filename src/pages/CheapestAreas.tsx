import { Navigation } from '@/components/Navigation'
import { CheapestAreas } from '@/components/cheapest-areas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Filter } from 'lucide-react'
import { mockProperties } from '@/data/mockData'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const CheapestAreasPage = () => {
  const [selectedType, setSelectedType] = useState('all')
  
  const propertyTypes = ['all', 'apartment', 'house', 'commercial']

  // Calculate city averages for the map section
  const cityAverages = mockProperties.reduce((acc, property) => {
    if (!acc[property.city]) {
      acc[property.city] = { total: 0, count: 0, properties: [] }
    }
    acc[property.city].total += property.price
    acc[property.city].count += 1
    acc[property.city].properties.push(property)
    return acc
  }, {} as Record<string, any>)

  const cityData = Object.entries(cityAverages).map(([city, data]) => ({
    city,
    avgPrice: Math.round(data.total / data.count),
    count: data.count,
    coordinates: data.properties[0].coordinates
  })).sort((a, b) => a.avgPrice - b.avgPrice)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MapPin className="h-10 w-10 text-success" />
            Most Affordable Areas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the best value districts across Georgia. Find affordable properties 
            with detailed price breakdowns and location insights.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-to-r from-card to-success/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter by Property Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Property Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Badge variant="outline">📊 Real-time data</Badge>
                <Badge variant="outline">💰 Price per m² included</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cheapest Areas Component */}
          <CheapestAreas />

          {/* Map Visualization */}
          <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                🗺️ City Price Map
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Geographic distribution of property prices across Georgian cities
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityData.map((city, index) => (
                  <div 
                    key={city.city}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-success/10 border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        index === 0 ? 'bg-success' : 
                        index === 1 ? 'bg-warning' : 
                        'bg-muted'
                      }`} />
                      <div>
                        <div className="font-medium">{city.city}</div>
                        <div className="text-sm text-muted-foreground">
                          {city.count} properties
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-success">
                        {formatPrice(city.avgPrice)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        avg price
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-6 h-64 bg-gradient-to-br from-muted/20 to-success/10 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Interactive map visualization</p>
                  <p className="text-xs">Coming soon with detailed area mapping</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <Card className="mt-8 bg-gradient-to-r from-success/10 to-success/5 border border-success/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-success mb-4">💡 Investment Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Best Value:</span>
                <span className="ml-2 text-muted-foreground">
                  {cityData[0]?.city} offers the lowest entry prices
                </span>
              </div>
              <div>
                <span className="font-medium">Growth Potential:</span>
                <span className="ml-2 text-muted-foreground">
                  Emerging districts showing 15% annual growth
                </span>
              </div>
              <div>
                <span className="font-medium">ROI Opportunity:</span>
                <span className="ml-2 text-muted-foreground">
                  Secondary cities offer higher rental yields
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CheapestAreasPage