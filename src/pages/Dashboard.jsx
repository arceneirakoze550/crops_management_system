import { useState } from 'react'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Button from '../components/Button'

const Dashboard = () => {
  const [weather] = useState({
    temp: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    forecast: [
      { day: 'Mon', icon: 'sun', high: 28, low: 18 },
      { day: 'Tue', icon: 'cloud', high: 25, low: 17 },
      { day: 'Wed', icon: 'rain', high: 22, low: 15 },
      { day: 'Thu', icon: 'sun', high: 27, low: 19 },
      { day: 'Fri', icon: 'cloud', high: 24, low: 16 }
    ]
  })

  const [recentActivity] = useState([
    { action: 'Harvested', item: 'Wheat - Field A', time: '2 hours ago', type: 'harvest' },
    { action: 'Planted', item: 'Corn - Field C', time: '5 hours ago', type: 'plant' },
    { action: 'Sold', item: 'Rice - 500kg', time: '1 day ago', type: 'sale' },
    { action: 'Irrigated', item: 'Field B', time: '1 day ago', type: 'irrigate' },
    { action: 'Fertilized', item: 'Tomato - Greenhouse', time: '2 days ago', type: 'fertilize' }
  ])

  const [salesData] = useState([
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 3800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4600 },
    { month: 'May', amount: 5800 },
    { month: 'Jun', amount: 6200 }
  ])

  const maxSale = Math.max(...salesData.map(s => s.amount))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Crops"
          value="1,284"
          change="+12.5%"
          changeType="up"
          color="emerald"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
        <StatCard
          title="Active Farms"
          value="23"
          change="+3"
          changeType="up"
          color="blue"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Total Revenue"
          value="$48,250"
          change="+18.2%"
          changeType="up"
          color="amber"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Inventory Items"
          value="856"
          change="-2.4%"
          changeType="down"
          color="purple"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <Button variant="secondary" size="sm">This Year</Button>
          </div>
          <div className="flex items-end gap-3 h-48">
            {salesData.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-emerald-500/20 rounded-t-md relative group cursor-pointer hover:bg-emerald-500/30 transition-colors"
                  style={{ height: `${(item.amount / maxSale) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">Weather</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl font-bold text-white">{weather.temp}°</div>
            <div>
              <p className="text-gray-300 font-medium">{weather.condition}</p>
              <p className="text-sm text-gray-500">H:{weather.forecast[0].high}° L:{weather.forecast[0].low}°</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/[0.04] rounded-lg p-3">
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="text-sm text-white font-medium">{weather.humidity}%</p>
            </div>
            <div className="bg-white/[0.04] rounded-lg p-3">
              <p className="text-xs text-gray-500">Wind</p>
              <p className="text-sm text-white font-medium">{weather.wind} km/h</p>
            </div>
          </div>
          <div className="space-y-2">
            {weather.forecast.map((day) => (
              <div key={day.day} className="flex items-center justify-between py-2 border-t border-white/[0.04]">
                <span className="text-sm text-gray-400 w-10">{day.day}</span>
                <span className="text-sm text-gray-500 capitalize">{day.icon === 'sun' ? '☀️' : day.icon === 'cloud' ? '☁️' : '🌧️'}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">{day.high}°</span>
                  <span className="text-sm text-gray-600">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const typeColors = {
                harvest: 'bg-emerald-500/20 text-emerald-400',
                plant: 'bg-blue-500/20 text-blue-400',
                sale: 'bg-amber-500/20 text-amber-400',
                irrigate: 'bg-cyan-500/20 text-cyan-400',
                fertilize: 'bg-purple-500/20 text-purple-400'
              }
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[activity.type]}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {activity.type === 'harvest' && <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4" />}
                      {activity.type === 'plant' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
                      {activity.type === 'sale' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1" />}
                      {activity.type === 'irrigate' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.719-1.19-7.843-3.082" />}
                      {activity.type === 'fertilize' && <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.action}</span>{' '}
                      <span className="text-gray-400">{activity.item}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{activity.time}</span>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Crop Distribution</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Wheat', percentage: 35, color: 'bg-amber-500', amount: '450 tons' },
              { name: 'Corn', percentage: 28, color: 'bg-yellow-500', amount: '360 tons' },
              { name: 'Rice', percentage: 20, color: 'bg-emerald-500', amount: '260 tons' },
              { name: 'Tomato', percentage: 12, color: 'bg-red-500', amount: '155 tons' },
              { name: 'Others', percentage: 5, color: 'bg-gray-500', amount: '59 tons' }
            ].map((crop) => (
              <div key={crop.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{crop.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{crop.amount}</span>
                    <span className="text-sm text-white font-medium">{crop.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${crop.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${crop.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
