import type { APIRoute } from 'astro';
import { testQueries } from '../../../lib/db/test-queries';
import type { Env } from '../../../env';

export const GET: APIRoute = async ({ locals }) => {
  try {
    // Access D1 binding through CloudFlare runtime
    const runtime = locals.runtime;
    const db = runtime?.env?.DB;
    
    if (!db) {
      return new Response(
        JSON.stringify({ 
          error: 'Database not configured',
          message: 'D1 binding not found. Please configure D1 binding in CloudFlare Pages dashboard.',
          instructions: [
            '1. Go to CloudFlare Pages dashboard',
            '2. Select your project (astro-solidjs-cloudflare)',
            '3. Go to Settings > Functions',
            '4. Add D1 database binding:',
            '   - Variable name: DB',
            '   - D1 database: test (ID: 22d86356-69ed-4aef-9892-3ed62ba427f1)'
          ],
          debug: {
            hasRuntime: !!runtime,
            hasEnv: !!runtime?.env,
            envKeys: runtime?.env ? Object.keys(runtime.env) : [],
            localsKeys: Object.keys(locals)
          }
        }), 
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
    // Access D1 binding through CloudFlare runtime
    const runtime = locals.runtime;
    const db = runtime?.env?.DB;
    
    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Database not configured' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const data = await request.json() as { name?: string; surname?: string };
    
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