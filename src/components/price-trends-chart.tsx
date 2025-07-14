import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { priceHistory } from '@/data/mockData'

export function PriceTrendsChart() {
  // Transform data for chart - group by date and show multiple cities
  const chartData = priceHistory.reduce((acc, item) => {
    const existingDate = acc.find(d => d.date === item.date)
    if (existingDate) {
      existingDate[item.city] = item.avgPrice
    } else {
      acc.push({
        date: item.date,
        [item.city]: item.avgPrice
      })
    }
    return acc
  }, [] as any[])

  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    return monthNames[parseInt(month) - 1]
  }

  const formatPrice = (value: number) => {
    return `$${value}/m²`
  }

  return (
    <Card className="bg-gradient-to-br from-card to-accent/5 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          📈 Property Price Trends
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Average price per square meter across major Georgian cities
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                className="text-muted-foreground"
              />
              <YAxis 
                tickFormatter={formatPrice}
                className="text-muted-foreground"
              />
              <Tooltip 
                formatter={(value: number) => [formatPrice(value), '']}
                labelFormatter={(label) => `Month: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Tbilisi" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Batumi" 
                stroke="hsl(var(--accent-foreground))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent-foreground))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--accent-foreground))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Kutaisi" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--success))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}