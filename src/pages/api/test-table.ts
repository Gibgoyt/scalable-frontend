import type {APIRoute} from 'astro'
import {testQueries} from 'src/lib/db/test-queries'

export const GET: APIRoute = async ({locals}) => {
  try {
    const runtime = locals.runtime
    const db = runtime?.env?.DB

    if (!db) {
      return new Response(
        `<div class="text-center py-8">
          <div class="text-red-400 mb-2">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-red-600 dark:text-red-400 font-medium">Database not configured</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">D1 binding not found. Please configure D1 binding in CloudFlare Pages dashboard.</p>
        </div>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        },
      )
    }

    const result = await testQueries.getAll(db)
    const data = result.results

    if (Array.isArray(data) && data.length > 0) {
      // Create table HTML
      const tableHTML = `
        <table class="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          <thead class="bg-blue-50 dark:bg-blue-900/20">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">
                Surname
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            ${data.map(row => `
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onclick="openUserDetails(${row.id})">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${row.id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  ${row.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  ${row.surname}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <div class="flex gap-2">
                    <button onclick="event.stopPropagation(); openUpdateModalDirect(${row.id}, '${row.name}', '${row.surname}')" class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                      Update
                    </button>
                    <button onclick="event.stopPropagation(); openDeleteModalDirect(${row.id})" class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      
      return new Response(tableHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    } else {
      // Show empty state
      return new Response(
        `<div class="text-center py-8">
          <div class="text-gray-400 dark:text-gray-500 mb-2">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400">No data found in D1 database</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">The database appears to be empty or not properly configured.</p>
        </div>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        },
      )
    }
  } catch (error) {
    console.error('Error fetching test data:', error)

    return new Response(
      `<div class="text-center py-8">
        <div class="text-red-400 mb-2">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-red-600 dark:text-red-400 font-medium">Failed to load D1 data</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ${error instanceof Error ? error.message : 'Unable to connect to the database'}
        </p>
        <button 
          hx-get="/api/test-table"
          hx-target="#d1-table-container"
          hx-swap="innerHTML"
          class="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html'
        },
      },
    )
  }
}