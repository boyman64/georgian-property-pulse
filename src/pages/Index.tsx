import { TrendingUp, DollarSign, Home, MapPin } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { PriceTrendsChart } from '@/components/price-trends-chart'
import { CheapestAreas } from '@/components/cheapest-areas'
import { SeasonalAnalysis } from '@/components/seasonal-analysis'
import { MarketSaturation } from '@/components/market-saturation'
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
      {/* Header */}
      <div className="bg-gradient-primary shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-4xl font-bold text-primary-foreground mb-2">
              🏠 Georgian Real Estate Analytics
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Advanced market insights and analytics for smarter property decisions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Properties"
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

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PriceTrendsChart />
          <CheapestAreas />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SeasonalAnalysis />
          <MarketSaturation />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            Data updated daily • Built for Georgian real estate professionals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;