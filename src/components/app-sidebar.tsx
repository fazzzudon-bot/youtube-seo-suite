"use client"

import * as React from "react"
import {
  Search,
  Tag,
  FileText,
  Heading,
  BarChart3,
  Video,
  TrendingUp,
  Lightbulb,
  Home,
  BookOpen,
  LayoutDashboard,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

const tools = [
  {
    title: "Keyword Research",
    url: "/keyword-research",
    icon: Search,
  },
  {
    title: "Tag Generator",
    url: "/tag-generator",
    icon: Tag,
  },
  {
    title: "Title Generator",
    url: "/title-generator",
    icon: Heading,
  },
  {
    title: "Description Generator",
    url: "/description-generator",
    icon: FileText,
  },
  {
    title: "Channel Analyzer",
    url: "/channel-analyzer",
    icon: BarChart3,
  },
  {
    title: "Video Analyzer",
    url: "/video-analyzer",
    icon: Video,
  },
  {
    title: "Trending Topics",
    url: "/trending-topics",
    icon: TrendingUp,
  },
  {
    title: "Video Ideas",
    url: "/video-ideas",
    icon: Lightbulb,
  },
]

const navigation = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Video className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">YT SEO Tool</span>
            <span className="text-xs text-muted-foreground">Grow Your Channel</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SEO Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
