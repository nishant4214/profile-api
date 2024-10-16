const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://fgglnzwavwqttvodqwcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2xuendhdndxdHR2b2Rxd2NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODk4OTI2NiwiZXhwIjoyMDQ0NTY1MjY2fQ.a0eTNtw3dctakhMK1cIaoMZNGGHIhtnAq0tDGqRXARg';
const supabase = createClient(supabaseUrl, supabaseKey);


exports.handler = async (event) => {
    // Ensure the request is a POST request
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }
  
    // Parse the incoming request body
    const { projectId, userId, commentText } = JSON.parse(event.body);
  
    // Validate input
    if (!projectId || !userId || !commentText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Project ID, User ID, and Comment Text are required' }),
      };
    }
  
    // Insert the new comment into the database
    const { data, error } = await supabase
      .from('comments')
      .insert([{ project_id: projectId, user_id: userId, comment_text: commentText }]);
  
    if (error) {
      console.error('Error adding comment:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  
    return {
      statusCode: 201, // Created
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };