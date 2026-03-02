import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton do `NavSidebar`.
 */
export default function NavSidebarSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-20" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 3 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
