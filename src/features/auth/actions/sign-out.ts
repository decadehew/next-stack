'use server'
import { getAuth } from '@/features/auth/queries/get-auth'
import { lucia } from '@/lib/lucia'
import { signInPath } from '@/paths'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOut = async () => {
  const { session } = await getAuth()

  if (!session) {
    redirect(signInPath())
  }

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  ;(await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  redirect(signInPath())
}