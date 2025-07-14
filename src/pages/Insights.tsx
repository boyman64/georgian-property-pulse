import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lightbulb, TrendingUp, Target, Star, AlertTriangle, Crown } from 'lucide-react'
import { marketStats } from '@/data/mockData'

const Insights = () => {
  const currentWeek = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  })

  // Generate weekly insights
  const weeklyInsights = {
    bestArea: 'Gori',
    reason: 'Lowest entry price with 15% growth potential',
    avgPrice: 67000,
    growthPotential: 15.2,
    riskLevel: 'Low',
    timeToInvest: 'Excellent'
  }

  const marketTrends = [
    {
      title: 'Winter Buying Season',
      description: 'Property prices typically drop 8-12% in December-February',
      impact: 'High',
      actionable: 'Wait for winter discounts if not urgent',
      icon: TrendingUp,
      type: 'seasonal'
    },
    {
      title: 'Tbilisi Market Saturation',
      description: 'Central districts showing signs of overvaluation',
      impact: 'Medium',
      actionable: 'Consider emerging districts or secondary cities',
      icon: AlertTriangle,
      type: 'warning'
    },
    {
      title: 'Commercial Real Estate Boom',
      description: 'Office spaces in tech districts up 18% year-over-year',
      impact: 'High',
      actionable: 'Saburtalo commercial properties showing strong ROI',
      icon: Star,
      type: 'opportunity'
    }
  ]

  const investmentRecommendations = [
    {
      city: 'Gori',
      district: 'Gori Center',
      score: 95,
      reason: 'Undervalued market with government infrastructure investments',
      avgPrice: 67000,
      predictedGrowth: '+22%',
      timeline: '18 months',
      riskLevel: 'Low'
    },
    {
      city: 'Kutaisi',
      district: 'University District',
      score: 88,
      reason: 'Student housing demand driving consistent rental income',
      avgPrice: 75000,
      predictedGrowth: '+18%',
      timeline: '12 months',
      riskLevel: 'Low'
    },
    {
      city: 'Batumi',
      district: 'New Boulevard',
      score: 82,
      reason: 'Tourism recovery boosting luxury property demand',
      avgPrice: 280000,
      predictedGrowth: '+15%',
      timeline: '24 months',
      riskLevel: 'Medium'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 80) return 'text-warning'
    return 'text-muted-foreground'
  }

  const getImpactBadge = (impact: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (impact) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'outline'
    }
  }

  const getRiskBadge = (risk: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (risk) {
      case 'Low': return 'default'
      case 'Medium': return 'secondary'
      case 'High': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="h-10 w-10 text-warning" />
            Market Insights & Recommendations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered analysis and recommendations for optimal real estate investment decisions in Georgia.
          </p>
        </div>

        {/* Weekly Spotlight */}
        <Card className="mb-8 bg-gradient-to-r from-success/10 to-success/5 border border-success/20 shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-success" />
                <CardTitle className="text-xl font-bold text-success">
                  This Week's Best Investment Opportunity
                </CardTitle>
              </div>
              <Badge variant="outline">{currentWeek}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{weeklyInsights.bestArea}</h3>
                <p className="text-muted-foreground mb-4">{weeklyInsights.reason}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Price:</span>
                    <span className="font-semibold">{formatPrice(weeklyInsights.avgPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Potential:</span>
                    <span className="font-semibold text-success">+{weeklyInsights.growthPotential}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <Badge variant={getRiskBadge(weeklyInsights.riskLevel)}>
                      {weeklyInsights.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-center p-6 bg-success/10 rounded-lg">
                  <Target className="h-12 w-12 text-success mx-auto mb-3" />
                  <div className="text-3xl font-bold text-success mb-1">Excellent</div>
                  <div className="text-sm text-muted-foreground">Time to Invest</div>
                </div>
                <Button className="mt-4 w-full">View Properties in {weeklyInsights.bestArea}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card className="mb-8 bg-gradient-to-br from-card to-warning/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📊 Current Market Trends</CardTitle>
            <p className="text-sm text-muted-foreground">
              Key market movements and actionable insights for informed decision-making
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => {
                const Icon = trend.icon
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-background to-muted/5"
                  >
                    <div className={`p-2 rounded-full ${
                      trend.type === 'opportunity' ? 'bg-success/20 text-success' :
                      trend.type === 'warning' ? 'bg-destructive/20 text-destructive' :
                      'bg-warning/20 text-warning'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{trend.title}</h4>
                        <Badge variant={getImpactBadge(trend.impact)}>
                          {trend.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Action:</span>
                        <span className="text-xs text-success">{trend.actionable}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Investment Recommendations */}
        <Card className="bg-gradient-to-br from-card to-primary/5 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">🎯 Top Investment Recommendations</CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-scored opportunities ranked by potential ROI and market analysis
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {investmentRecommendations.map((rec, index) => (
                <Card 
                  key={index}
                  className={`${
                    index === 0 ? 'ring-2 ring-success/20 bg-gradient-to-br from-success/5 to-success/10' :
                    'bg-gradient-to-br from-card to-muted/5'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Crown className="h-5 w-5 text-success" />}
                        <span className="text-lg font-bold">{rec.city}</span>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(rec.score)}`}>
                        {rec.score}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">District:</span>
                        <div className="text-muted-foreground">{rec.district}</div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Why invest:</span>
                        <div className="text-sm text-muted-foreground">{rec.reason}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Avg Price:</span>
                          <div className="font-semibold">{formatPrice(rec.avgPrice)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth:</span>
                          <div className="font-semibold text-success">{rec.predictedGrowth}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeline:</span>
                          <div className="font-medium">{rec.timeline}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Risk:</span>
                          <Badge variant={getRiskBadge(rec.riskLevel)} className="text-xs">
                            {rec.riskLevel}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        variant={index === 0 ? "default" : "outline"} 
                        className="w-full mt-4"
                      >
                        View Properties
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Footer */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-primary mb-2">Powered by PropertyIQ AI</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Our recommendations are generated using machine learning algorithms that analyze market trends, 
              price movements, economic indicators, and demand patterns across Georgian real estate markets.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Last updated: {currentWeek} • Next update: Weekly
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Insights