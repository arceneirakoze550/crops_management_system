const Loading = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const content = (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin`}></div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return content
}

export const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-4 animate-pulse">
        <div className="h-4 bg-white/[0.04] rounded flex-1"></div>
        <div className="h-4 bg-white/[0.04] rounded flex-1"></div>
        <div className="h-4 bg-white/[0.04] rounded flex-1"></div>
        <div className="h-4 bg-white/[0.04] rounded w-20"></div>
      </div>
    ))}
  </div>
)

export default Loading
