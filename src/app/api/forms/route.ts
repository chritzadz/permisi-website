export async function GET(request: Request) {
  

  return new Response(JSON.stringify(), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}