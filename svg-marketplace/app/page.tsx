export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>✅ Next.js is Working!</h1>
      <p>If you see this, the deployment is successful.</p>
      <p>Environment check:</p>
      <ul style={{ listStyle: 'none' }}>
        <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}</li>
        <li>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}</li>
      </ul>
    </div>
  )
}
