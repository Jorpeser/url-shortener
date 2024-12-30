"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import DarkModeButton from "../DarkModeButton"

export const LoggedNavbar = () => (
  <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex-1" />
      <div className="flex items-center justify-center flex-1">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1 space-x-4">
        <Button variant="ghost" onClick={() => {}}>
          Logged in
        </Button>
        <DarkModeButton />
      </div>
    </div>
  </nav>
)
