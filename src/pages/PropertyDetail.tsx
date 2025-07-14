import { useParams, Link } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Calendar, Ruler, Home, Phone, Mail } from 'lucide-react'
import { mockProperties } from '@/data/mockData'

const PropertyDetail = () => {
  const { id } = useParams()
  const property = mockProperties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Link to="/">
              <Button>← Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const pricePerSqm = Math.round(property.price / property.size)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'apartment': return 'default'
      case 'house': return 'secondary'
      case 'commercial': return 'outline'
      default: return 'secondary'
    }
  }

  // Similar properties in the same city
  const similarProperties = mockProperties
    .filter(p => p.id !== property.id && p.city === property.city)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <Card className="bg-gradient-to-br from-card to-primary/5 shadow-elegant">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{property.district}, {property.city}</span>
                    </div>
                    <Badge variant={getTypeColor(property.type)} className="text-sm">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(pricePerSqm)}/m²
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <Ruler className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{property.size}m²</div>
                    <div className="text-xs text-muted-foreground">Total Area</div>
                  </div>
                  
                  {property.rooms && (
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <Home className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="font-semibold">{property.rooms}</div>
                      <div className="text-xs text-muted-foreground">Rooms</div>
                    </div>
                  )}
                  
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{property.dateAdded}</div>
                    <div className="text-xs text-muted-foreground">Listed</div>
                  </div>
                  
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="font-semibold">ID: {property.id}</div>
                    <div className="text-xs text-muted-foreground">Property ID</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Description */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  This {property.type} in {property.district} offers excellent value in one of {property.city}'s 
                  most desirable neighborhoods. With {property.size}m² of living space
                  {property.rooms && ` across ${property.rooms} well-appointed rooms`}, 
                  this property represents an outstanding investment opportunity.
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Prime location in {property.district}</li>
                      <li>• {property.size}m² of total space</li>
                      {property.rooms && <li>• {property.rooms} rooms layout</li>}
                      <li>• Recently listed property</li>
                      <li>• Competitive market pricing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Neighborhood</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Central {property.city} location</li>
                      <li>• Well-connected district</li>
                      <li>• Growing property values</li>
                      <li>• Good investment potential</li>
                      <li>• Established community</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-muted/20 to-primary/10 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="font-medium">{property.district}, {property.city}</p>
                    <p className="text-sm">Interactive map coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Interested in this property?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Agent
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Request Information
                </Button>
                
                <div className="text-xs text-muted-foreground text-center pt-2">
                  PropertyIQ • Licensed Real Estate Platform
                </div>
              </CardContent>
            </Card>

            {/* Market Analysis */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">City Average:</span>
                  <span className="font-semibold">{formatPrice(pricePerSqm * 1.15)}/m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Property:</span>
                  <span className="font-semibold text-success">{formatPrice(pricePerSqm)}/m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Value Rating:</span>
                  <Badge variant="default">Excellent</Badge>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    This property is priced 13% below market average
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Similar Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {similarProperties.map((similar) => (
                  <Link 
                    key={similar.id} 
                    to={`/property/${similar.id}`}
                    className="block p-3 border rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm line-clamp-1">
                          {similar.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {similar.district}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">
                          {formatPrice(similar.price)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {similar.size}m²
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail