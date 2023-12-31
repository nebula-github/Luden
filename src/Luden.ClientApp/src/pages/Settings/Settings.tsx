import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Link, NavLink, Outlet } from 'react-router-dom'
import ProtectedRoute from '@/components/protected-route'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useMediaQuery } from 'usehooks-ts'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const Settings = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <ScrollArea className="h-[100vh] w-[100vw] p-5">
      <ProtectedRoute>
        <Link to="/app/home">
          <Button size="icon" variant="outline" className="m-3">
            <ChevronLeft />
          </Button>
        </Link>
        <div className="bg-background justify-center text-foreground lg:container h-full flex col max-w-none grid-cols-2 lg:px-0 font-normal">
          <div className="flex w-full lg:p-10 rounded-lg flex-col ">
            <div className="mb-3">
              <h1 className="text-2xl">Settings</h1>
              <p className="text-muted-foreground">
                Manage your sistem preferences and personalization
              </p>
            </div>
            <Separator />
            {isMobile && (
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">
                    <NavLink to="profile">
                      {({ isActive }) => (
                        <Button
                          className={cn(
                            'w-full rounded-lg justify-center',
                            isActive && 'bg-primary-foreground',
                          )}
                          variant="ghost"
                        >
                          Profile
                        </Button>
                      )}
                    </NavLink>
                  </TabsTrigger>
                  <TabsTrigger value="password">
                    <NavLink to="appearence">
                      {({ isActive }) => (
                        <Button
                          className={cn(
                            'w-full rounded-lg justify-center',
                            isActive && 'bg-primary-foreground',
                          )}
                          variant="ghost"
                        >
                          Appearance
                        </Button>
                      )}
                    </NavLink>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="p-3">
                    <Outlet />
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="p-3">
                    <Outlet />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            {!isMobile && (
              <div className="grid-cols-12 mt-10 grid max-[780px]:hidden">
                <div className="col-span-3 lg:p-5">
                  <NavLink to="profile">
                    {({ isActive }) => (
                      <Button
                        className={cn(
                          'w-full rounded-lg justify-start',
                          isActive && 'bg-primary-foreground',
                        )}
                        variant="ghost"
                      >
                        Profile
                      </Button>
                    )}
                  </NavLink>
                  <NavLink to="appearence">
                    {({ isActive }) => (
                      <Button
                        className={cn(
                          'w-full rounded-lg justify-start',
                          isActive && 'bg-primary-foreground',
                        )}
                        variant="ghost"
                      >
                        Appearance
                      </Button>
                    )}
                  </NavLink>
                </div>
                <div className="col-span-9 p-5">
                  <Outlet />
                </div>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoute>
    </ScrollArea>
  )
}

export default Settings
