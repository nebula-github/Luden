import { ChevronsLeft, MenuIcon, Settings } from 'lucide-react'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import LudenImagotype from '@/components/luden-logo'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useEventCallback, useMediaQuery } from 'usehooks-ts'
import ProtectedRoute from '../components/protected-route'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export let IsCollapsed = false

export const Navigation = () => {
  const isResizingRef = useRef(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  let newWidth: number

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
    }
  }

  const Page = () => {
    return (
      <ScrollArea className="h-[92vh] flex flex-wrap">
        <div
          className="bg-background mx-[2vw] my-[2vh]"
          style={
            isCollapsed
              ? { width: '98vw' }
              : sidebarRef.current !== null
              ? { width: `calc(98vw - ${sidebarRef.current.style.width})` }
              : { width: `98vw` }
          }
        >
          <Outlet />
        </div>
      </ScrollArea>
    )
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      IsCollapsed = false
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)',
      )
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const collapse = useEventCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      IsCollapsed = true
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsResetting(false), 300)
    }
  })

  return (
    <ProtectedRoute>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-[100vh] bg-card overflow-y-auto relative flex w-60 flex-col z-[99999999] border-input border-r-[1px]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0',
        )}
      >
        <div className="h-[10vh]">
          <NavLink
            to="/app/home"
            className="h-full inline-flex items-center space-x-1"
          >
            <LudenImagotype />
            <Label className="text-lg"> Luden </Label>
          </NavLink>
          <Button
            onClick={collapse}
            size="icon"
            variant="link"
            className={cn(
              'h-6 w-6 text-muted-foreground rounded-sm hover:bg-background absolute top-5 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
              isMobile && 'opacity-100',
            )}
          >
            <ChevronsLeft />
          </Button>
          <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          />
        </div>
        <Separator />

        <NavLink to="characters">
          {({ isActive }) => (
            <Button
              className={cn(
                'w-full justify-start rounded-none',
                isActive && 'bg-primary-foreground',
              )}
              variant="ghost"
            >
              Characters
            </Button>
          )}
        </NavLink>
        <Separator />

        <NavLink to="rpg">
          {({ isActive }) => (
            <Button
              className={cn(
                'w-full justify-start rounded-none',
                isActive && 'bg-primary-foreground',
              )}
              variant="ghost"
            >
              RPGs
            </Button>
          )}
        </NavLink>
        <Separator />

        <NavLink to="rpg-systems">
          {({ isActive }) => (
            <Button
              className={cn(
                'w-full justify-start rounded-none',
                isActive && 'bg-primary-foreground',
              )}
              variant="ghost"
            >
              RPG Systems
            </Button>
          )}
        </NavLink>
        <Separator />

        <Button variant="ghost" className="absolute bottom-0 m-3">
          <Link
            to="/settings"
            className="inline-flex space-x-1 items-center h-full w-half"
          >
            <Settings className="rounded-sm" />
            <Label className="text-md cursor-pointer">Settings</Label>
          </Link>
        </Button>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full',
        )}
      >
        <div className="bg-primary-foreground h-[6vh] flex flex-row">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="text-muted-foreground h-full w-7 mx-2 transition-all ease-in-out duration-100"
            />
          )}
        </div>
        {isMobile ? isCollapsed && <Page /> : <Page />}
      </div>
    </ProtectedRoute>
  )
}

export default Navigation
