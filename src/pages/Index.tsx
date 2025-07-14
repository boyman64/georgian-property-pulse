import { Navigation } from '@/components/Navigation'
import { TrendingUp, DollarSign, Home, MapPin } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { PropertySearch } from '@/components/PropertySearch'
import { marketStats } from '@/data/mockData'

const Index = () => {
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
      
      {/* Hero Section */}
      <div className="bg-gradient-primary shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <h1 className="text-5xl font-bold text-primary-foreground mb-4">
              Welcome to PropertyIQ
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Your intelligent companion for Georgian real estate market insights. 
              Make smarter property decisions with advanced analytics and data-driven insights.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Listings"
            value={marketStats.totalProperties.toLocaleString()}
            icon={<Home />}
            change={5.2}
            trend="up"
          />
          <StatCard
            title="Average Price"
            value={formatPrice(marketStats.avgPrice)}
            icon={<DollarSign />}
            change={marketStats.monthlyChange}
            trend="up"
          />
          <StatCard
            title="Active Cities"
            value={marketStats.topCities.length}
            icon={<MapPin />}
            change={0}
            trend="neutral"
          />
          <StatCard
            title="Market Growth"
            value="+12.5%"
            icon={<TrendingUp />}
            change={1.8}
            trend="up"
          />
        </div>

        {/* Property Search */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Property</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search through our comprehensive database of Georgian properties. 
              Filter by location, type, and price to find exactly what you're looking for.
            </p>
          </div>
          <PropertySearch />
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-card to-primary/5 rounded-lg shadow-card">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Price Trends</h3>
            <p className="text-muted-foreground">
              Track property price movements across Georgian cities with interactive charts and forecasts.
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-card to-success/5 rounded-lg shadow-card">
            <MapPin className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Area Analysis</h3>
            <p className="text-muted-foreground">
              Discover the most affordable districts and high-demand locations for optimal investment opportunities.
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-card to-warning/5 rounded-lg shadow-card">
            <Home className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
            <p className="text-muted-foreground">
              Get AI-powered recommendations on the best times to buy and emerging market opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;