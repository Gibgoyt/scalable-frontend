import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'

interface SettingsPageProps {
  isDark: boolean
  onThemeChange: (dark: boolean) => void
}

const SettingsPage: Component<SettingsPageProps> = (props) => {
  const [notifications, setNotifications] = createSignal(true)
  const [autoSave, setAutoSave] = createSignal(true)
  const [compressionLevel, setCompressionLevel] = createSignal(50)

  return (
    <div class="p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Settings</h1>
        
        {/* Appearance Section */}
        <div class={`mb-8 p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
          <h2 class="text-xl font-semibold mb-4">Appearance</h2>
          
          <div class="flex items-center justify-between py-3">
            <div>
              <h3 class="font-medium">Dark Mode</h3>
              <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Toggle between light and dark theme
              </p>
            </div>
            <button
              onClick={() => props.onThemeChange(!props.isDark)}
              class={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                props.isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                class={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  props.isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Documentation Generator Settings */}
        <div class={`mb-8 p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
          <h2 class="text-xl font-semibold mb-4">Documentation Generator</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between py-3">
              <div>
                <h3 class="font-medium">Auto-save Generated Docs</h3>
                <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Automatically save documentation as it's generated
                </p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave())}
                class={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  autoSave() ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  class={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    autoSave() ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div class="py-3">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium">Documentation Detail Level</h3>
                <span class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {compressionLevel()}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={compressionLevel()}
                onInput={(e) => setCompressionLevel(parseInt(e.currentTarget.value))}
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="flex justify-between text-xs mt-1">
                <span class={props.isDark ? 'text-gray-500' : 'text-gray-400'}>Brief</span>
                <span class={props.isDark ? 'text-gray-500' : 'text-gray-400'}>Detailed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div class={`mb-8 p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
          <h2 class="text-xl font-semibold mb-4">Notifications</h2>
          
          <div class="flex items-center justify-between py-3">
            <div>
              <h3 class="font-medium">Push Notifications</h3>
              <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Get notified when documentation generation is complete
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications())}
              class={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                notifications() ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                class={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  notifications() ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* AI Model Settings */}
        <div class={`mb-8 p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
          <h2 class="text-xl font-semibold mb-4">AI Model Configuration</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">
                Preferred AI Model
              </label>
              <select class={`w-full p-3 rounded-lg border ${
                props.isDark 
                  ? 'bg-zinc-700 border-zinc-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                <option value="gpt-4">OpenAI GPT-4</option>
                <option value="claude">Anthropic Claude</option>
                <option value="local-llama">Local LLaMA</option>
                <option value="local-mistral">Local Mistral</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">
                API Key (for cloud models)
              </label>
              <input
                type="password"
                placeholder="Enter your API key..."
                class={`w-full p-3 rounded-lg border ${
                  props.isDark 
                    ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div class="flex gap-4">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Save Settings
          </button>
          <button class={`font-semibold py-2 px-6 rounded-lg transition-colors ${
            props.isDark 
              ? 'bg-zinc-700 hover:bg-zinc-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage