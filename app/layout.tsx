import SpotifySDKScript from './components/SpotifySDKScript';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1DB954" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-neutral-900 text-white">
        {children}
        <SpotifySDKScript />
      </body>
    </html>
  )
}

