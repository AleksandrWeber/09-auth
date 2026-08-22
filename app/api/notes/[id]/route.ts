export async function GET() {
  return Response.json({ id: 'demo' });
}

export async function DELETE() {
  return Response.json({ ok: true });
}
