import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 234 567 8900',
    farm: 'CropOS Farm'
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weather: true,
    harvest: true,
    sales: false,
    inventory: true
  })

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${activeTab === tab.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-2xl">
                  {profile.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{profile.fullName}</p>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
                  <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  <Input label="Farm Name" value={profile.farm} onChange={(e) => setProfile({ ...profile, farm: e.target.value })} />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white capitalize">{key} Notifications</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive updates about {key}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-emerald-500' : 'bg-white/[0.1]'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
              <form className="space-y-4">
                <Input label="Current Password" type="password" placeholder="Enter current password" />
                <Input label="New Password" type="password" placeholder="Enter new password" />
                <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </form>
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h4 className="text-sm font-medium text-white mb-2">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 mb-4">Add an extra layer of security to your account</p>
                <Button variant="secondary">Enable 2FA</Button>
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                  <div>
                    <p className="text-sm font-medium text-white">Language</p>
                    <p className="text-xs text-gray-500 mt-0.5">Select your preferred language</p>
                  </div>
                  <select className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none">
                    <option value="en" className="bg-gray-900">English</option>
                    <option value="fr" className="bg-gray-900">French</option>
                    <option value="es" className="bg-gray-900">Spanish</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                  <div>
                    <p className="text-sm font-medium text-white">Measurement Unit</p>
                    <p className="text-xs text-gray-500 mt-0.5">Choose between metric and imperial</p>
                  </div>
                  <select className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none">
                    <option value="metric" className="bg-gray-900">Metric (kg, ha)</option>
                    <option value="imperial" className="bg-gray-900">Imperial (lb, acres)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                  <div>
                    <p className="text-sm font-medium text-white">Currency</p>
                    <p className="text-xs text-gray-500 mt-0.5">Set your preferred currency</p>
                  </div>
                  <select className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none">
                    <option value="usd" className="bg-gray-900">USD ($)</option>
                    <option value="eur" className="bg-gray-900">EUR (€)</option>
                    <option value="gbp" className="bg-gray-900">GBP (£)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button>Save Preferences</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
