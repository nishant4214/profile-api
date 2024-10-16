const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://fgglnzwavwqttvodqwcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2xuendhdndxdHR2b2Rxd2NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODk4OTI2NiwiZXhwIjoyMDQ0NTY1MjY2fQ.a0eTNtw3dctakhMK1cIaoMZNGGHIhtnAq0tDGqRXARg';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
    console.log('Received event:', event);

    // Handle preflight request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204, // No Content
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins for testing
                'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow specific methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
            },
        };
    }

    // Ensure the request is a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    // Parse the incoming request body
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (err) {
        console.error('Error parsing JSON:', err);
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({ error: 'Invalid JSON format' }),
        };
    }

    const { projectId, userId, commentText } = body;

    // Validate input
    if (!projectId || !userId || !commentText) {
        return {
            statusCode: 400, // Bad Request
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
            statusCode: 500, // Internal Server Error
            body: JSON.stringify({ error: error.message || 'Could not add comment' }),
        };
    }

    console.log('Comment added:', data);

    return {
        statusCode: 201, // Created
        headers: {
            'Access-Control-Allow-Origin': '*', // Adjust for production
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Comment added successfully',
            comment: {
                ...data[0], // Assuming data is an array, use the first element
                commentText: commentText, // Include the comment text
            },
        }),
    };
};