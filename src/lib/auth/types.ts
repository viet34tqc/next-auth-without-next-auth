export type User = {
  id: string
  username: string | null
  email: string
}

export type Session = {
  id: string
  userId: string
  expiresAt: Date
}

export type AuthResult = {
  session: Session | null
  user: User | null
}
