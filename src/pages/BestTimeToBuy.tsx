import { Navigation } from '@/components/Navigation'
import { SeasonalAnalysis } from '@/components/seasonal-analysis'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, TrendingDown, AlertCircle } from 'lucide-react'
import { seasonalData } from '@/data/mockData'

const BestTimeToBuy = () => {
  const sortedMonths = [...seasonalData].sort((a, b) => a.avgPrice - b.avgPrice)
  const bestMonth = sortedMonths[0]
  const worstMonth = sortedMonths[sortedMonths.length - 1]
  const priceDifference = worstMonth.avgPrice - bestMonth.avgPrice
  const savingsPercentage = ((priceDifference / worstMonth.avgPrice) * 100).toFixed(1)

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
            <Calendar className="h-10 w-10 text-warning" />
            Best Time to Buy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover seasonal patterns in Georgian property prices. 
            Time your purchase perfectly to maximize savings and investment potential.
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-success/5 shadow-card">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-success mb-1">{bestMonth.month}</div>
              <div className="text-sm text-muted-foreground">Best month to buy</div>
              <div className="text-lg font-semibold mt-2">{formatPrice(bestMonth.avgPrice)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-1">{savingsPercentage}%</div>
              <div className="text-sm text-muted-foreground">Potential savings</div>
              <div className="text-lg font-semibold mt-2">{formatPrice(priceDifference)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-destructive/5 shadow-card">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-2xl font-bold text-destructive mb-1">{worstMonth.month}</div>
              <div className="text-sm text-muted-foreground">Most expensive month</div>
              <div className="text-lg font-semibold mt-2">{formatPrice(worstMonth.avgPrice)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Seasonal Analysis Chart */}
        <div className="mb-8">
          <SeasonalAnalysis />
        </div>

        {/* Detailed Monthly Breakdown */}
        <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📅 Monthly Price Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete seasonal analysis with listing volume and price trends
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasonalData.map((month, index) => {
                const rank = sortedMonths.findIndex(m => m.month === month.month) + 1
                const isGoodTime = rank <= 4
                const isBadTime = rank >= 10

                return (
                  <div 
                    key={month.month}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      isGoodTime ? 'bg-success/10 border-success/20' :
                      isBadTime ? 'bg-destructive/10 border-destructive/20' :
                      'bg-muted/10 border-border'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{month.month}</span>
                      <Badge variant={isGoodTime ? 'default' : isBadTime ? 'destructive' : 'secondary'}>
                        #{rank}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Price:</span>
                        <span className="font-semibold">{formatPrice(month.avgPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Listings:</span>
                        <span>{month.listingCount}</span>
                      </div>
                      {isGoodTime && (
                        <div className="text-xs text-success font-medium">💡 Great time to buy</div>
                      )}
                      {isBadTime && (
                        <div className="text-xs text-destructive font-medium">⚠️ Consider waiting</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Strategy Tips */}
        <Card className="mt-8 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-warning mb-4">📋 Buying Strategy Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">Winter Advantage (Dec-Feb)</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Lowest competition from buyers</li>
                  <li>• Sellers more motivated to close deals</li>
                  <li>• Average 12% lower prices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Spring/Summer Caution (Apr-Aug)</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Highest competition and prices</li>
                  <li>• Limited negotiation power</li>
                  <li>• Consider waiting if not urgent</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BestTimeToBuy