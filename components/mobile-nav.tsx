"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function MobileNav() {
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-4">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Categories
          </Link>
          <Link
            href="/deals"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Deals
          </Link>
          {session ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Orders
              </Link>
              <Link
                href="/settings"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Settings
              </Link>
              <Link
                href="/api/auth/signout"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Sign out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
} 