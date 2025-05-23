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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onSpotifyWebPlaybackSDKReady = () => {
                console.log('Spotify Web Playback SDK successfully loaded.');
                document.dispatchEvent(new CustomEvent('spotify-sdk-ready'));
              };
            `
          }}
        />
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </head>
      <body className="bg-neutral-900 text-white">{children}</body>
    </html>
  )
}