const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://fgglnzwavwqttvodqwcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2xuendhdndxdHR2b2Rxd2NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODk4OTI2NiwiZXhwIjoyMDQ0NTY1MjY2fQ.a0eTNtw3dctakhMK1cIaoMZNGGHIhtnAq0tDGqRXARg';
const supabase = createClient(supabaseUrl, supabaseKey);


exports.handler = async (event) => {
    // Extract project ID from query parameters
    const { projectId } = event.queryStringParameters;
  
    if (!projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Project ID is required' }),
      };
    }
  
    // Fetch comments for the given project ID
    const { data, error } = await supabase
      .from('comments')
      .select('id, comment_text, created_at, users(username)') // Select necessary fields
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });
  
    if (error) {
      console.error('Error fetching comments:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };