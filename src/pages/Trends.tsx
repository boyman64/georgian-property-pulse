import { Navigation } from '@/components/Navigation'
import { PriceTrendsChart } from '@/components/price-trends-chart'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'

const Trends = () => {
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const cities = ['all', 'Tbilisi', 'Batumi', 'Kutaisi']
  const propertyTypes = ['all', 'apartment', 'house', 'commercial']

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-primary" />
            Property Price Trends
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analyze property price movements over time across Georgian cities. 
            Filter by location and property type to discover market patterns.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-to-r from-card to-primary/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Filter Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Badge variant="outline">📊 7-month data available</Badge>
              <Badge variant="outline">📈 Real-time updates</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Price Trends Chart */}
        <div className="mb-8">
          <PriceTrendsChart />
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">+6.2%</div>
              <div className="text-sm text-muted-foreground">Tbilisi growth (YTD)</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-primary/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">+4.8%</div>
              <div className="text-sm text-muted-foreground">Batumi growth (YTD)</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">+3.1%</div>
              <div className="text-sm text-muted-foreground">Kutaisi growth (YTD)</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Trends