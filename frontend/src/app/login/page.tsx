'use client'
import Link from "next/link"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { api_fetch } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRouter } from "next/navigation"

export default function LoginForm() {

  const handleGoogleLogin = async () => {}
  const handlegithubLogin = async () => {}

  const router = useRouter()

  const formSchema = z.object({
    emailOrUsername: z.string(),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/(?=.*\d)(?=.*[A-Z])/, "Password must contain at least one uppercase letter and one number")
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    await api_fetch("/login", "POST", values).then((response) => {
      if (response) {
        // Redirect to the home page
        //console.log(response)
        router.push("/")
      } else {
        console.error("Login failed")
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <Card className="mx-auto w-96 max-w-sm">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        {/* Login form and buttons */}
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailOrUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Username or email </FormLabel>
                      <Input 
                        {...field}
                        type="text"
                        placeholder="Username or email"
                        required
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel> Password </FormLabel>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <Input 
                        {...field}
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <Button type="submit" className="w-full" >
                  Login
                </Button>
              </form>
            </Form>

            {/* Login submit button */}
            {/* Or continue with decorator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            {/* Google and Github login buttons */}
            <div className="flex items-center gap-2">
              {/* Google login button */}
              <Button variant="outline" type="button" className="w-full">
                <Icons.google className="inline-block w-4 h-4 mr-2" />
                Google
              </Button>
              {/* Github login button */}
              <Button variant="outline" type="button" className="w-full">
                <Icons.gitHub className="inline-block w-4 h-4 mr-2" />
                Github
              </Button>
          </div>
            </div>

          {/* Sign up link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
