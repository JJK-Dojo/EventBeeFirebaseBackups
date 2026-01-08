
'use client';

import Link from 'next/link';
import { LogOut, User, ShieldCheck, BarChart2 } from 'lucide-react';
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

export default function UserMenu() {
  // In a real app, you'd have logic to determine if the user is an admin
  const isAdmin = true; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://picsum.photos/seed/9/40/40"
              alt="@guest"
              data-ai-hint="person portrait"
            />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Guest User</p>
            <p className="text-xs leading-none text-muted-foreground">
              guest@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
         <Link href="/analytics">
          <DropdownMenuItem>
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </DropdownMenuItem>
        </Link>
        {isAdmin && (
           <Link href="/admin">
            <DropdownMenuItem>
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
            </DropdownMenuItem>
           </Link>
        )}
        <DropdownMenuSeparator />
        <Link href="/login">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
