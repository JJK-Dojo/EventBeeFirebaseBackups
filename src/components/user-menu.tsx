
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, User, ShieldCheck, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';


export default function UserMenu() {
  const router = useRouter();
  const { toast } = useToast();

  // Mock user state
  const [user, setUser] = useState<{ displayName: string; email: string; photoURL: string; } | null>(null);
  const isUserLoading = false;

  // In a real app, you'd have logic to determine if the user is an admin
  const isAdmin = true;

  const handleLogin = () => {
    // Simulate login
    setUser({
        displayName: 'Guest User',
        email: 'guest@example.com',
        photoURL: 'https://picsum.photos/seed/9/40/40'
    });
    router.push('/dashboard');
  }

  const handleLogout = () => {
    // Simulate logout
    setUser(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/');
  }

  if (isUserLoading) {
    return (
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10 animate-pulse bg-muted" />
      </Button>
    )
  }

  if (!user) {
    return (
       <Button variant="outline" onClick={handleLogin}>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user.photoURL || "https://picsum.photos/seed/9/40/40"}
              alt={user.displayName || "User"}
              data-ai-hint="person portrait"
            />
            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || "EventBee User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || "No email provided"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" passHref>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
         <Link href="/analytics" passHref>
          <DropdownMenuItem>
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </DropdownMenuItem>
        </Link>
        {isAdmin && (
           <Link href="/admin" passHref>
            <DropdownMenuItem>
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
            </DropdownMenuItem>
           </Link>
        )}
        <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
