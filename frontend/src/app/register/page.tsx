"use client"
import Link from "next/link"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { api_fetch } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function RegisterPage() {
  // Form schema, restrictions and validation
  const formSchema = z.object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters long")
      .max(30, "Username cant be longer than 30 characters")
      .regex(/^[a-zA-Z0-9]+$/),
    email: z
      .string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*\d)(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter and one number"
      ),
  })

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await api_fetch("/register", "POST", values)
    console.log(values)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <Card className="mx-auto w-96 max-w-sm">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Register form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Username form field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email form field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password form field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </form>
            </Form>
            {/* Alternative register separator */}
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
            {/* Google and Github register buttons */}
            <div className="flex items-center gap-2">
              {/* Google register button */}
              <Button variant="outline" type="button" className="w-full">
                <Icons.google className="inline-block w-4 h-4 mr-2" />
                Google
              </Button>
              {/* Github register button */}
              <Button variant="outline" type="button" className="w-full">
                <Icons.gitHub className="inline-block w-4 h-4 mr-2" />
                Github
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
