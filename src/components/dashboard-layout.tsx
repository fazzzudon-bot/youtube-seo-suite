"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 w-full overflow-x-hidden">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex h-14 items-center px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
            </div>
          </div>
          <div className="flex-1 space-y-4 p-4 pt-6 md:p-6 lg:p-8 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}