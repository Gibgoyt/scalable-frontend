import type { Component } from 'solid-js'
import { createSignal, For, Show } from 'solid-js'

interface DocumentationPageProps {
  isDark: boolean
}

const DocumentationPage: Component<DocumentationPageProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<'generate' | 'templates' | 'history'>('generate')
  const [selectedLanguage, setSelectedLanguage] = createSignal('javascript')
  const [generationStatus, setGenerationStatus] = createSignal<'idle' | 'processing' | 'completed'>('idle')
  const [progress, setProgress] = createSignal(0)

  const languages = [
    { id: 'javascript', name: 'JavaScript/Node.js', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'go', name: 'Go', icon: '🐹' },
    { id: 'rust', name: 'Rust', icon: '🦀' }
  ]

  const templates = [
    { id: 'standard', name: 'Standard Documentation', description: 'Comprehensive documentation with examples' },
    { id: 'api', name: 'API Documentation', description: 'Focused on API endpoints and schemas' },
    { id: 'minimal', name: 'Minimal Documentation', description: 'Brief overviews and key functions only' },
    { id: 'detailed', name: 'Detailed Technical', description: 'In-depth technical documentation with internals' }
  ]

  const startGeneration = () => {
    setGenerationStatus('processing')
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setGenerationStatus('completed')
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
  }

  return (
    <div class="p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Documentation Generator</h1>
          <p class={`${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate comprehensive documentation for your codebase using AI
          </p>
        </div>

        {/* Tabs */}
        <div class="mb-8">
          <div class="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {['generate', 'templates', 'history'].map((tab) => (
              <button
                onClick={() => setActiveTab(tab as any)}
                class={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab() === tab
                    ? props.isDark
                      ? 'bg-zinc-800 text-blue-400 border-b-2 border-blue-400'
                      : 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : props.isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Tab */}
        <Show when={activeTab() === 'generate'}>
          <div class="space-y-6">
            {/* Language Selection */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-4">Project Language</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <For each={languages}>
                  {(lang) => (
                    <button
                      onClick={() => setSelectedLanguage(lang.id)}
                      class={`p-4 rounded-lg border-2 transition-all ${
                        selectedLanguage() === lang.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : props.isDark
                            ? 'border-zinc-700 hover:border-zinc-600'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div class="text-2xl mb-2">{lang.icon}</div>
                      <div class="font-medium">{lang.name}</div>
                    </button>
                  )}
                </For>
              </div>
            </div>

            {/* File Upload */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-4">Upload Codebase</h2>
              <div class={`border-2 border-dashed rounded-lg p-8 text-center ${
                props.isDark ? 'border-zinc-600' : 'border-gray-300'
              }`}>
                <div class="text-4xl mb-4">📁</div>
                <h3 class="text-lg font-medium mb-2">Drag and drop your project folder</h3>
                <p class={`${props.isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Or click to browse and select your project files
                </p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* Generation Options */}
            <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
              <h2 class="text-xl font-semibold mb-4">Generation Options</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium">Include Examples</h3>
                    <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Generate code examples for functions and classes
                    </p>
                  </div>
                  <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium">API Documentation</h3>
                    <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Document API endpoints and schemas
                    </p>
                  </div>
                  <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium">Maintain Folder Structure</h3>
                    <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Keep the same folder structure in documentation
                    </p>
                  </div>
                  <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                </div>
              </div>
            </div>

            {/* Generation Status */}
            <Show when={generationStatus() !== 'idle'}>
              <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
                <h2 class="text-xl font-semibold mb-4">Generation Progress</h2>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span>Processing files...</span>
                    <span>{Math.round(progress())}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={`width: ${progress()}%`}
                    />
                  </div>
                  <Show when={generationStatus() === 'completed'}>
                    <div class="text-green-600 font-medium">✅ Documentation generated successfully!</div>
                  </Show>
                </div>
              </div>
            </Show>

            {/* Generate Button */}
            <div class="flex justify-center">
              <button
                onClick={startGeneration}
                disabled={generationStatus() === 'processing'}
                class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {generationStatus() === 'processing' ? 'Generating...' : 'Generate Documentation'}
              </button>
            </div>
          </div>
        </Show>

        {/* Templates Tab */}
        <Show when={activeTab() === 'templates'}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <For each={templates}>
              {(template) => (
                <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer`}>
                  <h3 class="text-lg font-semibold mb-2">{template.name}</h3>
                  <p class={`${props.isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {template.description}
                  </p>
                  <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Use Template
                  </button>
                </div>
              )}
            </For>
          </div>
        </Show>

        {/* History Tab */}
        <Show when={activeTab() === 'history'}>
          <div class="space-y-4">
            {[1, 2, 3].map((i) => (
              <div class={`p-6 rounded-lg ${props.isDark ? 'bg-zinc-800' : 'bg-white'} shadow-sm`}>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-semibold mb-1">Project Documentation #{i}</h3>
                    <p class={`text-sm ${props.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Generated 2 days ago • 127 files processed
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      View
                    </button>
                    <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Show>
      </div>
    </div>
  )
}

export default DocumentationPage