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
import { LogIn, LogOut, User as UserIcon, LayoutDashboard, PlusCircle, Shield, BarChart2, Sheet, Database, FlaskConical, Palette, UserPlus, Monitor } from 'lucide-react';
import type { User } from 'firebase/auth';
import { useSignOut } from '@/firebase/auth/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserMenu({ user }: { user: User | null }) {
  const { signOut, error } = useSignOut();
  const router = useRouter();

  if (error) {
    console.error('Sign out error:', error);
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) {
    return (
        <div className="flex items-center gap-2">
            <Link href="/login" passHref>
                <Button variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                </Button>
            </Link>
            <Link href="/signup" passHref>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                </Button>
            </Link>
        </div>
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
         <DropdownMenuLabel>Admin & Dev</DropdownMenuLabel>
        <DropdownMenuItem asChild>
            <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Admin Panel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Link href="/analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
            <Link href="/responsive-preview"><Monitor className="mr-2 h-4 w-4" />Responsive Preview</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
            <Link href="/site-planner"><Sheet className="mr-2 h-4 w-4" />Site Details</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
            <Link href="/site-planner-excel"><Sheet className="mr-2 h-4 w-4" />Site Planner (Legacy)</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Link href="/db-view"><Database className="mr-2 h-4 w-4" />DB View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Link href="/test-ai"><FlaskConical className="mr-2 h-4 w-4" />Test AI</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
            <Link href="/test-ui"><Palette className="mr-2 h-4 w-4" />UI Showcase</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
