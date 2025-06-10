import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'

interface ProfilePageProps {
  isDark: boolean
}

const ProfilePage: Component<ProfilePageProps> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false)
  const [profile, setProfile] = createSignal({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Senior Developer',
    company: 'TechCorp Inc.',
    timezone: 'UTC-5 (Eastern)',
    joinDate: 'March 2024'
  })

  const [usage] = createSignal({
    planType: 'Pro',
    documentsGenerated: 1247,
    monthlyLimit: 5000,
    teamMembers: 3,
    storageUsed: '2.4 GB',
    storageLimit: '10 GB'
  })

  const achievements = [
    { title: 'Documentation Master', description: 'Generated 1000+ documents', icon: '🏆', earned: true },
    { title: 'Speed Demon', description: 'Processed 100 files in under 1 hour', icon: '⚡', earned: true },
    { title: 'Team Player', description: 'Collaborated on 10+ projects', icon: '🤝', earned: true },
    { title: 'Code Explorer', description: 'Documented 5+ programming languages', icon: '🗺️', earned: true },
    { title: 'Consistency King', description: 'Used the platform for 30 consecutive days', icon: '📅', earned: false },
    { title: 'Enterprise Hero', description: 'Documented enterprise-scale project', icon: '🏢', earned: false }
  ]

  const recentProjects = [
    { name: 'E-commerce Platform', status: 'Completed', date: '2 days ago' },
    { name: 'React Dashboard', status: 'In Progress', date: '1 week ago' },
    { name: 'Mobile API', status: 'Completed', date: '2 weeks ago' }
  ]

  return (
    <div class="p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Profile</h1>
          <p class={`${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account settings and view your activity
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div class="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing())}
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {isEditing() ? 'Save' : 'Edit'}
                </button>
              </div>

              <div class="flex items-center gap-6 mb-6">
                <div class={`w-20 h-20 rounded-full ${props.isDark ? 'bg-zinc-700' : 'bg-gray-200'} flex items-center justify-center text-2xl font-bold`}>
                  AJ
                </div>
                {isEditing() ? (
                  <button class={`text-sm ${props.isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                    Change Photo
                  </button>
                ) : null}
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Full Name</label>
                  {isEditing() ? (
                    <input
                      type="text"
                      value={profile().name}
                      class={`w-full p-3 rounded-lg border ${
                        props.isDark 
                          ? 'bg-zinc-700 border-zinc-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  ) : (
                    <p class={`p-3 ${props.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile().name}
                    </p>
                  )}
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Email</label>
                  {isEditing() ? (
                    <input
                      type="email"
                      value={profile().email}
                      class={`w-full p-3 rounded-lg border ${
                        props.isDark 
                          ? 'bg-zinc-700 border-zinc-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  ) : (
                    <p class={`p-3 ${props.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile().email}
                    </p>
                  )}
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Role</label>
                  {isEditing() ? (
                    <input
                      type="text"
                      value={profile().role}
                      class={`w-full p-3 rounded-lg border ${
                        props.isDark 
                          ? 'bg-zinc-700 border-zinc-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  ) : (
                    <p class={`p-3 ${props.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile().role}
                    </p>
                  )}
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Company</label>
                  {isEditing() ? (
                    <input
                      type="text"
                      value={profile().company}
                      class={`w-full p-3 rounded-lg border ${
                        props.isDark 
                          ? 'bg-zinc-700 border-zinc-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  ) : (
                    <p class={`p-3 ${props.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile().company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-6">Achievements</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div class={`p-4 rounded-lg border ${
                    achievement.earned
                      ? props.isDark ? 'border-green-600 bg-green-900/20' : 'border-green-200 bg-green-50'
                      : props.isDark ? 'border-zinc-700 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div class="flex items-center gap-3 mb-2">
                      <span class={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </span>
                      <h3 class={`font-semibold ${achievement.earned ? '' : 'opacity-50'}`}>
                        {achievement.title}
                      </h3>
                    </div>
                    <p class={`text-sm ${
                      achievement.earned 
                        ? props.isDark ? 'text-gray-300' : 'text-gray-600'
                        : 'opacity-50'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div class="space-y-6">
            {/* Usage Stats */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-6">Plan & Usage</h2>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="font-medium">Plan Type</span>
                  <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    {usage().planType}
                  </span>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">Documents Generated</span>
                    <span class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {usage().documentsGenerated} / {usage().monthlyLimit}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full"
                      style={`width: ${(usage().documentsGenerated / usage().monthlyLimit) * 100}%`}
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">Storage Used</span>
                    <span class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {usage().storageUsed} / {usage().storageLimit}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-green-600 h-2 rounded-full"
                      style="width: 24%"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="font-medium">Team Members</span>
                  <span>{usage().teamMembers}</span>
                </div>

                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Recent Projects */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-6">Recent Projects</h2>
              <div class="space-y-3">
                {recentProjects.map((project) => (
                  <div class={`p-3 rounded-lg ${props.isDark ? 'bg-zinc-900' : 'bg-gray-50'}`}>
                    <h3 class="font-medium mb-1">{project.name}</h3>
                    <div class="flex items-center justify-between">
                      <span class={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                      <span class={`text-xs ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage