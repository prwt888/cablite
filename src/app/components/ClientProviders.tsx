'use client' // This directive marks the component as a Client Component

import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism} from '@clerk/themes' // Import the dark theme
import { useDarkMode } from '../hooks/useDarkMode' // Import your hook
import { ReactNode } from 'react'

export default function ClientProviders({ children }: { children: ReactNode }) {
  // This hook will run on the client. It manages adding/removing
  // the 'dark-mode' class on the <html> element (based on its logic)
  // and provides the current state.
  const { isDarkMode } = useDarkMode()

  return (
    // Setup ClerkProvider here, within the Client Component
    <ClerkProvider
      appearance={{
        userProfile: { baseTheme: isDarkMode ? dark : undefined },
        userButton: { baseTheme: isDarkMode ? dark : undefined },
        signIn: {
            baseTheme: isDarkMode ? dark : neobrutalism,
           
        },
        signUp: { baseTheme: isDarkMode ? dark : neobrutalism },
      }}
    >
      {children} {/* Render the rest of your app */}
    </ClerkProvider>
  )
} 