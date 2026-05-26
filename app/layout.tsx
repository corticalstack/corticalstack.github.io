import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BootSequence } from "@/components/boot-sequence";
import { AudioBedProvider } from "@/components/audio-bed-provider";
import { ViewportCornerBrackets } from "@/components/viewport-corner-brackets";
import { AUDIO_PLAYLIST } from "@/lib/cdn";
import { SITE_URL } from "@/lib/site";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = "Cortical Stack // JP Boyd";
const description =
  "Cyberware storage unit for experiments and field notes, pushing boundaries at the intersection of human creativity, machine intelligence, and agentic systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "./",
    siteName: "Cortical Stack",
    images: "/og.jpg?v=2",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: "/og.jpg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth shadcn dark"
    >
      {/* TEMP-DEV: pre-paint boot gate disabled so the boot sequence plays on
          every load while iterating. Restore the <head> + inline script below
          (and re-enable the gate in components/boot-sequence.tsx) when done.
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('cs:boot-seen')==='1';var f=location.search.indexOf('boot=')!==-1;if(s&&!f)document.documentElement.classList.add('cs-no-boot');}catch(e){}})();",
          }}
        />
      </head>
      */}
      <body
        className={`font-body antialiased ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AudioBedProvider playlist={AUDIO_PLAYLIST}>
            <BootSequence />
            {children}
            <ViewportCornerBrackets />
          </AudioBedProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
