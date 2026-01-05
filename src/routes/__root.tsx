import * as React from 'react'
import {
  HeadContent,
  Scripts,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { useStore } from '@tanstack/react-store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from '@/components/Header'
import CommandBar from '@/components/CommandBar'
import { appStore } from '@/lib/store'

import appCss from '@/styles.css?url'

/**
 * 1. Define the Context Type
 * This tells the router that a QueryClient will be available
 * in all loaders and components.
 */
interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Leonhard Breuer' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  // This wraps the entire application
  component: RootComponent,
})

/**
 * 2. RootComponent
 * This handles the React Query Provider and provides the
 * hydration point for the client.
 */
function RootComponent() {
  // Access the queryClient that was created in your router.tsx
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <RootLayout />
      </RootDocument>
    </QueryClientProvider>
  )
}

/**
 * 3. RootDocument
 * This is the physical HTML shell.
 */
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden overflow-y-hidden">
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: () => <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'React Query',
              render: () => <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

/**
 * 4. RootLayout
 * Your UI wrapper with Tailwind and state logic.
 */
function RootLayout() {
  const focusMode = useStore(appStore, (s) => s.focusMode)

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out ${
        focusMode ? 'bg-[#0A0F0E] text-[#A0A7A6]' : 'bg-[#FAFAFA] text-[#1A1A1A]'
      }`}
    >
      {/* GRID OVERLAY */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          focusMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 border-[0.5px] border-black/5 m-4 lg:m-8" />
        <div className="absolute top-0 left-1/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
        <div className="absolute top-0 left-2/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
        <div className="absolute top-0 left-3/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-8 pt-32 pb-40 transition-all duration-700">
        <Outlet />
      </main>

      <CommandBar />
    </div>
  )
}
