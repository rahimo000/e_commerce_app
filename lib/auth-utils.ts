import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { User } from "next-auth"

export async function requireAuth() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }
  
  return session
}

export async function requireAdmin() {
  const session = await auth()
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }
  
  return session
}

export async function requireGuest() {
  const session = await auth()
  
  if (session) {
    redirect("/dashboard")
  }
  
  return session
}

// Type guard to check if user has required role
export function hasRole(user: User | undefined, role: string): boolean {
  return user?.role === role
}

// Type guard to check if user has any of the required roles
export function hasAnyRole(user: User | undefined, roles: string[]): boolean {
  return roles.some(role => user?.role === role)
} 