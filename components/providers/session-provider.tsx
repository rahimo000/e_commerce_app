"use client"

import { SessionProvider } from "next-auth/react"
import { type Session } from "next-auth"

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
} 