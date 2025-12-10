
'use client';

import Link from 'next/link';
import { PlusCircle, LogOut, User } from 'lucide-react';
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
import Logo from './logo';
import { useMounted } from '@/hooks/use-mounted';

function UserMenu() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Avatar className="h-10 w-10">
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
    );
  }

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

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/create-event">
            <Button
              style={{
                backgroundColor: 'hsl(var(--accent))',
                color: 'hsl(var(--accent-foreground))',
              }}
              className="hidden sm:flex hover:opacity-90"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Event
            </Button>
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
