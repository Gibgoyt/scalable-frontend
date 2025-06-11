import type {APIRoute} from 'astro'
import {testQueries} from 'src/lib/db/test-queries'

export const GET: APIRoute = async ({locals}) => {
  try {
    // Access D1 binding through CloudFlare runtime
    const runtime = locals.runtime
    const db = runtime?.env?.DB

    if (!db) {
      return new Response(
        JSON.stringify({
          error: 'Database not configured',
          message: 'D1 binding not found. Please configure D1 binding in CloudFlare Pages dashboard.',
          debug: {
            hasRuntime: !!runtime,
            hasEnv: !!runtime?.env,
            envKeys: runtime?.env ? Object.keys(runtime.env) : [],
            localsKeys: Object.keys(locals),
          },
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const result = await testQueries.getAll(db)

    return new Response(
      JSON.stringify(result.results),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching test data:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch test data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  }
}

export const POST: APIRoute = async ({request, locals}) => {
  try {
    // Access D1 binding through CloudFlare runtime
    const runtime = locals.runtime
    const db = runtime?.env?.DB

    if (!db) {
      return new Response(
        JSON.stringify({error: 'Database not configured'}),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        },
      )
    }

    const data = await request.json() as { name?: string; surname?: string }

    if (!data.name || !data.surname) {
      return new Response(
        JSON.stringify({
          error: 'Name and surname are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    const result = await testQueries.create(db, {
      name: data.name,
      surname: data.surname,
    })

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  } catch (error) {
    console.error('Error creating test record:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to create test record',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  }
}

export const PUT: APIRoute = async ({request, locals}) => {
  try {
    const runtime = locals.runtime
    const db = runtime?.env?.DB

    if (!db) {
      return new Response(
        JSON.stringify({error: 'Database not configured'}),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        },
      )
    }

    const contentType = request.headers.get('content-type') || ''
    let data: { id: number; name?: string; surname?: string }

    if (contentType.includes('application/x-www-form-urlencoded')) {
      // Handle HTMX form data
      const formData = await request.formData()
      data = {
        id: parseInt(formData.get('id') as string, 10),
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
      }
    } else {
      // Handle JSON data
      data = await request.json()
    }

    if (!data.id) {
      return new Response(
        JSON.stringify({
          error: 'ID is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    const result = await testQueries.update(db, data.id, {
      name: data.name,
      surname: data.surname,
    })

    if (!result) {
      return new Response(
        JSON.stringify({
          error: 'No fields to update or user not found'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    // For HTMX requests, return updated table HTML
    if (request.headers.get('hx-request')) {
      const allData = await testQueries.getAll(db)
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
            ${allData.results.map(row => `
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
      `
      
      return new Response(tableHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  } catch (error) {
    console.error('Error updating test record:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to update test record',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  }
}

export const DELETE: APIRoute = async ({request, locals}) => {
  try {
    const runtime = locals.runtime
    const db = runtime?.env?.DB

    if (!db) {
      return new Response(
        JSON.stringify({error: 'Database not configured'}),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        },
      )
    }

    let data: { id: number }
    
    // Handle HTMX requests vs JSON requests
    const contentType = request.headers.get('content-type') || ''
    const hxVals = request.headers.get('hx-vals')
    
    if (hxVals) {
      // HTMX request with hx-vals
      data = JSON.parse(hxVals)
    } else if (contentType.includes('application/json')) {
      // Standard JSON request
      data = await request.json()
    } else {
      return new Response(
        JSON.stringify({
          error: 'Invalid request format'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    if (!data.id) {
      return new Response(
        JSON.stringify({
          error: 'ID is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    const result = await testQueries.delete(db, data.id)

    // For HTMX requests, return updated table HTML
    if (request.headers.get('hx-request')) {
      const allData = await testQueries.getAll(db)
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
            ${allData.results.map(row => `
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
      `
      
      return new Response(tableHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Record deleted successfully',
        deleted: result.changes > 0,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  } catch (error) {
    console.error('Error deleting test record:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to delete test record',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  }
}