
'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Combobox } from '@/components/ui/combobox';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Users, AlertTriangle, Edit } from 'lucide-react';
import Header from '@/components/header';
import type { UserProfile } from '@/lib/types';
import {
  useCollection,
  useDoc,
  useFirestore,
  useUser,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';

const roleOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'admin', label: 'Admin' },
];

const roleBadges: Record<string, React.ReactNode> = {
  basic: <Badge variant="secondary">Basic</Badge>,
  advanced: <Badge variant="outline" className="border-blue-500 text-blue-500">Advanced</Badge>,
  admin: <Badge variant="destructive">Admin</Badge>,
};

export default function UsersPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user: currentUser, isUserLoading } = useUser();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState('');

  const currentUserProfileRef = useMemoFirebase(() => {
    if (!firestore || !currentUser) return null;
    return doc(firestore, 'users', currentUser.uid);
  }, [firestore, currentUser]);
  const { data: currentUserProfile, isLoading: isProfileLoading } =
    useDoc<UserProfile>(currentUserProfileRef);

  const usersCollectionRef = useMemoFirebase(() => {
    if (!firestore || currentUserProfile?.role !== 'admin') return null;
    return collection(firestore, 'users');
  }, [firestore, currentUserProfile]);

  const {
    data: users,
    isLoading: areUsersLoading,
    error: usersError,
  } = useCollection<UserProfile>(usersCollectionRef);

  const handleOpenEditDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedRole(user.role || 'basic');
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedUser || !firestore) return;

    const userDocRef = doc(firestore, 'users', selectedUser.uid);
    const updateData = { role: selectedRole };

    updateDoc(userDocRef, updateData)
      .then(() => {
        toast({
          title: 'Success!',
          description: `${selectedUser.displayName}'s role has been updated to ${selectedRole}.`,
        });
        setIsEditDialogOpen(false);
        setSelectedUser(null);
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const isLoading = isUserLoading || isProfileLoading;
  const isAdmin = currentUserProfile?.role === 'admin';

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-xl text-destructive">
                <AlertTriangle />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>You do not have permission to view this page.</p>
              <Button asChild className="mt-4">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                <Users className="h-8 w-8 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>
                View all users and manage their access permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {areUsersLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : usersError ? (
                <div className="text-destructive">
                  Error loading users: {usersError.message}
                </div>
              ) : (
                <Table>
                  <TableCaption>A list of all registered users.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user.uid}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={user.photoURL ?? undefined}
                                alt={user.displayName ?? ''}
                              />
                              <AvatarFallback>
                                {user.displayName?.charAt(0) || user.email?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.displayName}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {roleBadges[user.role || 'basic']}
                        </TableCell>
                        <TableCell className="text-right">
                           {currentUser?.uid !== user.uid && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenEditDialog(user)}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                            </Button>
                           )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Role for {selectedUser?.displayName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="role">User Role</Label>
              <Combobox
                items={roleOptions}
                value={selectedRole}
                onValueChange={setSelectedRole}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
