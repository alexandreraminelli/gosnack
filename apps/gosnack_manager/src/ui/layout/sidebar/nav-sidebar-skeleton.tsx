import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from "@/ui/primitives/sidebar";
import { Skeleton } from "@/ui/primitives/skeleton";

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
                  <Skeleton className="size-4 rounded-md" />
                  <Skeleton className="h-4 max-w-[70%] flex-1" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
