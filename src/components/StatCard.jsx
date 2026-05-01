const StatCard = ({ title, value, change, changeType, icon, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-400',
    amber: 'bg-amber-500/10 text-amber-400',
    purple: 'bg-purple-500/10 text-purple-400',
    rose: 'bg-rose-500/10 text-rose-400'
  }

  return (
    <div className="bg-[#0f0f16] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <svg
                className={`w-4 h-4 ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={changeType === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
              </svg>
              <span className={`text-xs font-medium ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {change}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.emerald} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
