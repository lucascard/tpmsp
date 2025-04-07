import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "./button"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}>({
  expanded: false,
  setExpanded: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <aside
      className={cn(
        "h-screen border-r bg-background transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="flex flex-col gap-1">{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div className="px-2">{children}</div>
}

export function SidebarMenuButton({
  children,
  tooltip,
  asChild,
  ...props
}: {
  children: React.ReactNode
  tooltip?: string
  asChild?: boolean
} & React.ComponentPropsWithoutRef<typeof Button>) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        !expanded && "justify-center px-2"
      )}
      title={!expanded ? tooltip : undefined}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  )
}

export function SidebarRail() {
  const { expanded, setExpanded } = React.useContext(SidebarContext)

  return (
    <div className="mt-2 px-2">
      <Button
        variant="ghost"
        className="w-full justify-center"
        size="icon"
        onClick={() => setExpanded(!expanded)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </div>
  )
}

export function SidebarTrigger() {
  const { expanded, setExpanded } = React.useContext(SidebarContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={() => setExpanded(!expanded)}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
} 