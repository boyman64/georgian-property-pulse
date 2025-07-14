import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProperties, Property } from '@/data/mockData'
import { Link } from 'react-router-dom'

interface PropertySearchProps {
  onPropertySelect?: (property: Property) => void
  showResults?: boolean
}

export function PropertySearch({ onPropertySelect, showResults = true }: PropertySearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])

  const cities = [...new Set(mockProperties.map(p => p.city))]
  const propertyTypes = [...new Set(mockProperties.map(p => p.type))]

  const handleSearch = () => {
    let filtered = mockProperties

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.district.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCity) {
      filtered = filtered.filter(p => p.city === selectedCity)
    }

    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType)
    }

    setFilteredProperties(filtered)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'apartment': return 'default'
      case 'house': return 'secondary'
      case 'commercial': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <Card className="bg-gradient-to-r from-card to-accent/5 shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by city, district, or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Properties
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedCity('')
                setSelectedType('')
                setFilteredProperties([])
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && filteredProperties.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <Badge variant="secondary">{filteredProperties.length} properties found</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Link 
                key={property.id} 
                to={`/property/${property.id}`}
                className="block"
              >
                <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-2">{property.title}</h4>
                        <Badge variant={getTypeColor(property.type)} className="text-xs">
                          {property.type}
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(property.price)}
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{property.district}, {property.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📐</span>
                          <span>{property.size}m²</span>
                          {property.rooms && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{property.rooms} rooms</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>Added {property.dateAdded}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showResults && filteredProperties.length === 0 && searchTerm && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No properties found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search filters.</p>
        </Card>
      )}
    </div>
  )
}