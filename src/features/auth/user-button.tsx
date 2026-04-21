import { auth } from '@/auth'
import Link from 'next/link'
import { signOutUser } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserIcon } from 'lucide-react'

export const UserButton = async () => {
  const session = await auth()

  if (!session) {
    return (
      <Button asChild>
        <Link href="/auth/signin">
          <UserIcon className="h-5 w-5" />
        </Link>
      </Button>
    )
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? ''

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 focus:ring-2 "
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="p-0 mb-1 cursor-pointer">
            <Link href="/dashboard" className="w-full">
              <Button variant="ghost" className="py-4 px-2 h-4 justify-start">
                Dashboard
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-0 mb-1 cursor-pointer">
            <form action={signOutUser} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="py-4 px-2 h-4 justify-start"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
