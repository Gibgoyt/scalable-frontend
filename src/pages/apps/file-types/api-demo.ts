import type { APIRoute } from 'astro';

// Example data
const frameworks = [
  { id: 1, name: 'Astro', description: 'Build faster websites with less client-side JavaScript', stars: 45000 },
  { id: 2, name: 'SolidJS', description: 'Simple and performant reactivity for building user interfaces', stars: 31000 },
  { id: 3, name: 'Svelte', description: 'Cybernetically enhanced web apps', stars: 77000 },
  { id: 4, name: 'Qwik', description: 'Instant-loading web apps, without effort', stars: 20000 }
];

// GET endpoint - returns all frameworks or a specific one
export const GET: APIRoute = ({ url, request }) => {
  const frameworkId = url.searchParams.get('id');
  const format = url.searchParams.get('format');
  
  // Get specific framework by ID
  if (frameworkId) {
    const framework = frameworks.find(f => f.id === parseInt(frameworkId));
    if (!framework) {
      return new Response(JSON.stringify({ error: 'Framework not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(framework), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Return data in different formats
  if (format === 'csv') {
    const csv = 'id,name,description,stars\n' + 
      frameworks.map(f => `${f.id},"${f.name}","${f.description}",${f.stars}`).join('\n');
    return new Response(csv, {
      status: 200,
      headers: { 'Content-Type': 'text/csv' }
    });
  }
  
  // Default: return all frameworks as JSON
  return new Response(JSON.stringify({
    frameworks,
    count: frameworks.length,
    timestamp: new Date().toISOString(),
    endpoint: '/apps/file-types/api-demo',
    method: request.method,
    headers: Object.fromEntries(request.headers.entries())
  }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Astro API Demo'
    }
  });
};

// POST endpoint - simulates adding a new framework
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.description) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name and description' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Simulate creating a new framework
    const newFramework = {
      id: frameworks.length + 1,
      name: body.name,
      description: body.description,
      stars: body.stars || 0,
      createdAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({
      message: 'Framework created successfully',
      framework: newFramework
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Invalid JSON in request body' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT endpoint - simulates updating a framework
export const PUT: APIRoute = async ({ url, request }) => {
  const frameworkId = url.searchParams.get('id');
  
  if (!frameworkId) {
    return new Response(JSON.stringify({ 
      error: 'Framework ID is required' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const body = await request.json();
    const framework = frameworks.find(f => f.id === parseInt(frameworkId));
    
    if (!framework) {
      return new Response(JSON.stringify({ 
        error: 'Framework not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Simulate update
    const updatedFramework = {
      ...framework,
      ...body,
      id: framework.id, // Prevent ID change
      updatedAt: new Date().toISOString()
    };
    
    return new Response(JSON.stringify({
      message: 'Framework updated successfully',
      framework: updatedFramework
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Invalid JSON in request body' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE endpoint - simulates deleting a framework
export const DELETE: APIRoute = ({ url }) => {
  const frameworkId = url.searchParams.get('id');
  
  if (!frameworkId) {
    return new Response(JSON.stringify({ 
      error: 'Framework ID is required' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const framework = frameworks.find(f => f.id === parseInt(frameworkId));
  
  if (!framework) {
    return new Response(JSON.stringify({ 
      error: 'Framework not found' 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({
    message: `Framework "${framework.name}" deleted successfully`,
    deletedId: framework.id
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

// Handle unsupported methods
export const ALL: APIRoute = ({ request }) => {
  return new Response(JSON.stringify({ 
    error: `Method ${request.method} not allowed`,
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
  }), {
    status: 405,
    headers: { 
      'Content-Type': 'application/json',
      'Allow': 'GET, POST, PUT, DELETE'
    }
  });
};