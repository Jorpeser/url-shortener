import { Navbar } from "@/components/Navbar/Navbar"
import { LoggedNavbar } from "@/components/Navbar/LoggedNavbar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "./theme-provider"
import { verifySession } from "@/lib/session"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MiniURL",
  description: "URL shortening web service",
}

export async function NavNav() {
  const session = await verifySession()
  const isAuth = session.isAuth
  return isAuth ? <LoggedNavbar /> : <Navbar />
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {
            NavNav()
          }
          <div className="mt-[-64px]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
