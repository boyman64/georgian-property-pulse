import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, TrendingUp, MapPin, Calendar, Zap, Lightbulb } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Cheapest Areas', href: '/cheapest-areas', icon: MapPin },
  { name: 'Best Time to Buy', href: '/best-time-to-buy', icon: Calendar },
  { name: 'Hot Zones', href: '/hot-zones', icon: Zap },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="bg-gradient-primary shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🏠</div>
              <span className="text-xl font-bold text-primary-foreground">
                PropertyIQ
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-primary-foreground p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}