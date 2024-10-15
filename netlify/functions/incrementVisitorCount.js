const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fgglnzwavwqttvodqwcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2xuendhdndxdHR2b2Rxd2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5ODkyNjYsImV4cCI6MjA0NDU2NTI2Nn0.-XnzbPZ_jG5HI_tfflNchpA-84EWoQaKESxCh5yijLo';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async () => {
  const { data, error } = await supabase
    .from('visitor_count')
    .select('count')
    .single();

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error retrieving count' }),
    };
  }

  const newCount = data.count + 1;
  const { error: updateError } = await supabase
    .from('visitor_count')
    .update({ count: newCount })
    .eq('id', data.id);

  if (updateError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error updating count' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ count: newCount }),
  };
};