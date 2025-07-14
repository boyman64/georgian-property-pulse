import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { seasonalData } from '@/data/mockData'
import { Calendar, TrendingDown } from 'lucide-react'

export function SeasonalAnalysis() {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const bestMonths = [...seasonalData]
    .sort((a, b) => a.avgPrice - b.avgPrice)
    .slice(0, 3)

  return (
    <Card className="bg-gradient-to-br from-card to-warning/5 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-warning" />
          Best Time to Buy Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Seasonal price patterns and optimal buying periods
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seasonalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-muted-foreground"
              />
              <YAxis 
                tickFormatter={formatPrice}
                className="text-muted-foreground"
              />
              <Tooltip 
                formatter={(value: number) => [formatPrice(value), 'Avg Price']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="avgPrice" 
                fill="hsl(var(--warning))"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-r from-warning/10 to-warning/5 p-4 rounded-lg border border-warning/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-4 w-4 text-warning" />
            <span className="font-semibold text-warning">Best Buying Months</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {bestMonths.map((month, index) => (
              <div key={month.month} className="text-center">
                <div className="font-medium text-foreground">{month.month}</div>
                <div className="text-sm font-semibold text-warning">
                  {formatPrice(month.avgPrice)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {index === 0 ? 'Cheapest' : index === 1 ? '2nd Best' : '3rd Best'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}