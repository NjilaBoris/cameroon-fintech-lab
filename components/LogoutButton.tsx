"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'

const LogOutButton = () => {
    const router = useRouter();
    const handleLogout = async () => {
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
        toast.success("Logged out successfully");
      router.push("/login"); // redirect to login page
    },
  },
});
    }
  return (
    <Button variant={'destructive'} size={"lg"} onClick={handleLogout}>
      Log Out <LogOut/>
    </Button>
  )
}

export default LogOutButton