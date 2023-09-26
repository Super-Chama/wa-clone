import type { Contact } from './types'
import type { Auth, Unsubscribe } from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export function listenAuthState(auth: Auth, callback: (user: Contact | null) => void): Unsubscribe {
  return auth.onAuthStateChanged((user) =>
    callback(
      user
        ? {
            uuid: user.uid,
            username: user.email ?? '',
            profileImg: user.photoURL ?? '',
            firstName: user.displayName?.split(' ')[0] ?? '',
            lastName: user.displayName?.split(' ')[1] ?? ''
          }
        : null
    )
  )
}

export async function googleSignin(auth: Auth): Promise<Contact | string> {
  const googleAuthProvider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider)
    return {
      uuid: user.uid,
      username: user.email ?? '',
      profileImg: user.photoURL ?? '',
      firstName: user.displayName?.split(' ')[0] ?? '',
      lastName: user.displayName?.split(' ')[1] ?? ''
    }
  } catch (error: unknown) {
    return (error as Error).message
  }
}
