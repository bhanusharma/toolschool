'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
            <h1 style={{
              fontSize: '72px',
              color: '#e7131a',
              lineHeight: 1,
              marginBottom: '16px',
              fontFamily: 'serif',
            }}>
              500
            </h1>
            <h2 style={{
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.5)',
              marginBottom: '24px',
            }}>
              Something went wrong
            </h2>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '16px 32px',
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
