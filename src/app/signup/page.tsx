
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Ghost } from 'lucide-react';


const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.244,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
)

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join the hive and start discovering local events!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" className="w-full">
            <GoogleIcon />
            Sign up with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" required />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          <div className="space-y-4 pt-4">
              <h3 className="text-md font-semibold text-center text-muted-foreground">
                  Connect Your Social Accounts (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="facebook" className="flex items-center text-muted-foreground">
                          <Facebook className="mr-2 h-4 w-4"/>
                          Facebook
                      </Label>
                      <Input id="facebook" placeholder="https://facebook.com/your-page" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center text-muted-foreground">
                          <Instagram className="mr-2 h-4 w-4"/>
                          Instagram
                      </Label>
                      <Input id="instagram" placeholder="https://instagram.com/your-profile" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="x-platform" className="flex items-center text-muted-foreground">
                          <Twitter className="mr-2 h-4 w-4"/>
                          X (Twitter)
                      </Label>
                      <Input id="x-platform" placeholder="https://x.com/your-handle" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center text-muted-foreground">
                          <Linkedin className="mr-2 h-4 w-4"/>
                          LinkedIn
                      </Label>
                      <Input id="linkedin" placeholder="https://linkedin.com/in/your-profile" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="flex items-center text-muted-foreground">
                          <MessageCircle className="mr-2 h-4 w-4"/>
                          WhatsApp
                      </Label>
                      <Input id="whatsapp" type="tel" placeholder="Your WhatsApp group link or number" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="snapchat" className="flex items-center text-muted-foreground">
                          <Ghost className="mr-2 h-4 w-4"/>
                          Snapchat
                      </Label>
                      <Input id="snapchat" placeholder="Your Snapchat username or link" />
                  </div>
              </div>
          </div>


          <Button className="w-full mt-4">Create account</Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Log in
              </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
