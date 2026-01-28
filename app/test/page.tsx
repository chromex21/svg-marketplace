export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>✅ Vercel Deployment Working!</h1>
      <p>Environment Variables Status:</p>
      <ul style={{ textAlign: 'left' }}>
        <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
        <li>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</li>
        <li>Cloudinary Name: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'}</li>
        <li>Cloudinary Preset: {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? '✅ Set' : '❌ Missing'}</li>
      </ul>
      <p style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Marketplace
        </a>
      </p>
    </div>
  )
}
