exports.handler = async function(event, context) {
  const token = event.path.split('/').pop();
  
  // Return the challenge response
  return {
    statusCode: 200,
    body: `${token}.7iy3Z661DrLHEmCt2GLa-rDBixvwBKZ-u2yX0ZfI4i4`,
    headers: {
      'Content-Type': 'text/plain'
    }
  };
}; 