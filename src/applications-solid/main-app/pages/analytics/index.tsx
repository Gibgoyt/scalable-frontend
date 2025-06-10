import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'

interface AnalyticsPageProps {
  isDark: boolean
}

const AnalyticsPage: Component<AnalyticsPageProps> = (props) => {
  const [timeRange, setTimeRange] = createSignal('7d')
  
  const timeRanges = [
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' }
  ]

  const metrics = [
    { 
      title: 'Total Documents Generated', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      icon: '📄'
    },
    { 
      title: 'Processing Time Saved', 
      value: '48 hrs', 
      change: '+23%', 
      trend: 'up',
      icon: '⏱️'
    },
    { 
      title: 'Files Processed', 
      value: '12,847', 
      change: '+8%', 
      trend: 'up',
      icon: '📁'
    },
    { 
      title: 'Active Projects', 
      value: '24', 
      change: '+4%', 
      trend: 'up',
      icon: '🚀'
    }
  ]

  const languageStats = [
    { name: 'JavaScript', percentage: 35, color: 'bg-yellow-500' },
    { name: 'Python', percentage: 28, color: 'bg-green-500' },
    { name: 'TypeScript', percentage: 20, color: 'bg-blue-500' },
    { name: 'Java', percentage: 12, color: 'bg-red-500' },
    { name: 'Other', percentage: 5, color: 'bg-gray-500' }
  ]

  const recentActivity = [
    { action: 'Documentation generated', project: 'E-commerce API', time: '2 hours ago', status: 'success' },
    { action: 'Processing started', project: 'React Dashboard', time: '4 hours ago', status: 'processing' },
    { action: 'Documentation completed', project: 'Mobile Backend', time: '6 hours ago', status: 'success' },
    { action: 'Error occurred', project: 'Legacy System', time: '8 hours ago', status: 'error' },
    { action: 'Documentation generated', project: 'Analytics Service', time: '1 day ago', status: 'success' }
  ]

  return (
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Analytics</h1>
            <p class={`${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Track your documentation generation performance and usage
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div class="flex space-x-2">
            {timeRanges.map((range) => (
              <button
                onClick={() => setTimeRange(range.id)}
                class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange() === range.id
                    ? 'bg-blue-600 text-white'
                    : props.isDark
                      ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <div class="flex items-center justify-between mb-4">
                <div class="text-2xl">{metric.icon}</div>
                <span class={`text-sm font-medium px-2 py-1 rounded ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 class={`text-sm font-medium ${props.isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {metric.title}
              </h3>
              <p class="text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Language Distribution */}
          <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
            <h2 class="text-xl font-semibold mb-6">Language Distribution</h2>
            <div class="space-y-4">
              {languageStats.map((lang) => (
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class={`w-3 h-3 rounded-full ${lang.color}`}></div>
                    <span class="font-medium">{lang.name}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        class={`h-2 rounded-full ${lang.color}`}
                        style={`width: ${lang.percentage}%`}
                      />
                    </div>
                    <span class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lang.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Time Chart */}
          <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
            <h2 class="text-xl font-semibold mb-6">Processing Time Trends</h2>
            <div class="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 35, 70, 55].map((height, index) => (
                <div class="flex-1 flex flex-col items-center">
                  <div 
                    class="w-full bg-blue-500 rounded-t"
                    style={`height: ${height}%`}
                  />
                  <span class={`text-xs mt-2 ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Day {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
          <h2 class="text-xl font-semibold mb-6">Recent Activity</h2>
          <div class="space-y-4">
            {recentActivity.map((activity, index) => (
              <div class="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-4">
                  <div class={`w-3 h-3 rounded-full ${
                    activity.status === 'success' 
                      ? 'bg-green-500' 
                      : activity.status === 'processing'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p class="font-medium">{activity.action}</p>
                    <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.project}
                    </p>
                  </div>
                </div>
                <span class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Section */}
        <div class="mt-8 flex justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Export Analytics Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage