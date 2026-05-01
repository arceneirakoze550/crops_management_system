import Card from '../components/Card'
import Button from '../components/Button'

const Reports = () => {
  const reports = [
    { title: 'Monthly Production Summary', description: 'Overview of all crop production for the current month', date: '2024-06-01', type: 'Production', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { title: 'Sales Performance Report', description: 'Detailed analysis of sales trends and revenue', date: '2024-06-01', type: 'Sales', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Inventory Status Report', description: 'Current stock levels and reorder recommendations', date: '2024-05-28', type: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { title: 'Farm Utilization Report', description: 'Analysis of farm land usage and efficiency', date: '2024-05-25', type: 'Farms', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Crop Health Analysis', description: 'Health metrics and yield predictions for all crops', date: '2024-05-20', type: 'Crops', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
  ]

  const typeColors = {
    Production: 'bg-emerald-500/10 text-emerald-400',
    Sales: 'bg-amber-500/10 text-amber-400',
    Inventory: 'bg-blue-500/10 text-blue-400',
    Farms: 'bg-purple-500/10 text-purple-400',
    Crops: 'bg-cyan-500/10 text-cyan-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Generate and view analytics reports</p>
        </div>
        <Button icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}>Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <Card key={index} className="cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${typeColors[report.type]} group-hover:scale-110 transition-transform`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={report.icon} /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{report.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${typeColors[report.type]}`}>{report.type}</span>
                  <span className="text-xs text-gray-600">{report.date}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.04]">
              <Button variant="ghost" size="sm" className="flex-1">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                View
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white mb-6">Quick Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">98.5%</p>
            <p className="text-sm text-gray-500 mt-1">Crop Health</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">1,284</p>
            <p className="text-sm text-gray-500 mt-1">Units Produced</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">$48,250</p>
            <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">87%</p>
            <p className="text-sm text-gray-500 mt-1">Farm Efficiency</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Reports
