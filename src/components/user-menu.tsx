'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User as UserIcon, LayoutDashboard, PlusCircle, UserCog } from 'lucide-react';
import type { User } from 'firebase/auth';
import { useSignOut } from '@/firebase/auth/hooks';
import Link from 'next/link';

export function UserMenu({ user }: { user: User | null }) {
  const { signOut, error } = useSignOut();

  if (error) {
    console.error('Sign out error:', error);
  }

  if (!user) {
    return (
        <Link href="/login" passHref>
            <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Button>
        </Link>
    );
  }

  const userInitial = user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? user.email ?? ''} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName ?? 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
             <Link href="/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
             <Link href="/create-event"><PlusCircle className="mr-2 h-4 w-4" />Create Event</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
