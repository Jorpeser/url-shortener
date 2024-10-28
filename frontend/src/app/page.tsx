'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import  DarkModeButton from "@/components/DarkModeButton"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Home() {

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleShorten = () => {
    console.log('Shortening...')
  }

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      benefits: ["5 links per month", "Basic analytics", "Standard support"]
    },
    {
      name: "Basic",
      price: "1.99",
      description: "Great for regular users",
      benefits: ["50 links per month", "Advanced analytics", "Priority support", "Custom short domains"]
    },
    {
      name: "Premium",
      price: "4.99",
      description: "Ideal for power users",
      benefits: ["Unlimited links", "Real-time analytics", "24/7 premium support", "API access", "Team collaboration"]
    }
  ]

  return (
    <>
    <section className="w-full min-h-screen flex items-center justify-center mt-[-64px]">
      <div className="container px-4 md:px-6 max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl select-none">
          Share <span className="relative underline-animation" style={{color:"hsl(var(--accent-text))"}}>shorter</span>, share <span className="relative underline-animation" style={{color:"hsl(var(--accent-text))"}}>better</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground select-none">
          Generate a random shortened link to your content.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            className="max-w-lg flex-1"
            placeholder="Enter your long URL here..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button className="btn-hover" onClick={handleShorten}>Shorten</Button>
        </div>
        <div className="mt-2">

      <Link href="#pricing" className="text-sm text-muted-foreground hover:underline">
        Do you prefer to customize your link? ▾
      </Link>
        </div>
      </div>
    </section>
    <section id="pricing" className="w-full pb-12 md:pb-24 lg:pb-32 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="flex flex-col w-full md:w-1/3 rounded-xl">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-xl p-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-6">
                  <div className="text-4xl font-bold mb-2">${plan.price}<span className="text-lg font-normal">/month</span></div>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{plan.name === "Free" ? "Get Started" : "Subscribe"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
