const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://fgglnzwavwqttvodqwcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2xuendhdndxdHR2b2Rxd2NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODk4OTI2NiwiZXhwIjoyMDQ0NTY1MjY2fQ.a0eTNtw3dctakhMK1cIaoMZNGGHIhtnAq0tDGqRXARg';
const supabase = createClient(supabaseUrl, supabaseKey);


exports.handler = async () => {
  const { data, error } = await supabase
    .from('visitor_count')
    .select('count')
    .single();

  console.log(data)

  if (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};