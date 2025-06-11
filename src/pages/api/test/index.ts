import type { APIRoute } from 'astro';
import { testQueries } from '../../../lib/db/test-queries';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = locals.runtime.env.DB;
    
    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Database not configured' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const result = await testQueries.getAll(db);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: result.results,
        meta: {
          count: result.results.length,
          success: result.success
        }
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching test data:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to fetch test data',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const db = locals.runtime.env.DB;
    
    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Database not configured' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const data = await request.json();
    
    if (!data.name || !data.surname) {
      return new Response(
        JSON.stringify({ error: 'Name and surname are required' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const result = await testQueries.create(db, {
      name: data.name,
      surname: data.surname
    });
    
    return new Response(
      JSON.stringify({
        success: true,
        data: result
      }), 
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error creating test record:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to create test record',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};