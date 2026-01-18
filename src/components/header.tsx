'use client';

import Link from 'next/link';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './logo';
import { useUser } from '@/firebase/auth/use-user';
import { UserMenu } from './user-menu';

export default function Header() {
  const { user, isLoading } = useUser();
  
  const logoHref = user ? '/dashboard' : '/login';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={logoHref}>
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/find-events" passHref>
             <Button
                className="hidden sm:flex hover:opacity-90 font-bold"
                aria-label="Find Event"
                 style={{
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                }}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Event
              </Button>
          </Link>
          <Link href="/find-events" passHref>
             <Button
                size="icon"
                className="flex sm:hidden hover:opacity-90"
                aria-label="Find Event"
                 style={{
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                }}
              >
                <Search className="h-5 w-5" />
              </Button>
          </Link>
           <Link href="/create-event" passHref>
              <Button
                className="hidden sm:flex hover:opacity-90 font-bold"
                 style={{
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Event
              </Button>
          </Link>
            <Link href="/create-event" passHref>
              <Button
                size="icon"
                className="flex hover:opacity-90 sm:hidden"
                style={{
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                }}
                aria-label="Create Event"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
          </Link>
          {!isLoading && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
