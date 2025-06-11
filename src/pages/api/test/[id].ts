import type {APIRoute} from 'astro'
import {testQueries} from 'src/lib/db/test-queries'

export const GET: APIRoute = async ({locals, params}) => {
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

    const id = parseInt(params.id || '', 10)

    if (isNaN(id)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid ID'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    const result = await testQueries.getById(db, id)

    if (!result) {
      return new Response(
        JSON.stringify({
          error: 'User not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          },
        },
      )
    }

    return new Response(
      JSON.stringify({
        ...result,
        description: 'This is a hard-coded description'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
      },
    )
  } catch (error) {
    console.error('Error fetching test record:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch test record',
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