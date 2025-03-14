
"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export interface PricingTier {
  id: string
  name: string
  price: {
    monthly: string | number
    yearly: string | number
  }
  description: string
  features: string[]
  cta: string
  popular?: boolean
  highlighted?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency as keyof typeof tier.price]
  const isNumericPrice = typeof price === "number"

  // Determine the link destination based on the tier ID
  const linkDestination = tier.id === "enterprise" ? "/enterprise" : "/waitlist"

  return (
    <Card className={cn(
      "flex flex-col h-full", 
      tier.highlighted 
        ? "border-2 border-brand-green/40 shadow-xl bg-gradient-to-b from-brand-green/10 to-brand-green/20 dark:from-brand-green/20 dark:to-brand-green/30 dark:border-brand-green/50" 
        : tier.popular 
          ? "border-2 border-brand-green shadow-xl" 
          : "shadow-md"
    )}>
      <CardHeader className={cn(
        "flex-none",
        tier.highlighted && "bg-transparent"
      )}>
        <CardTitle className={cn(
          "text-2xl font-semibold",
          tier.highlighted && "text-brand-green dark:text-accent-green"
        )}>
          {tier.name}
        </CardTitle>
        <CardDescription className="text-sm mt-2 dark:text-gray-300">{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-24 flex items-start justify-center mb-8">
          {isNumericPrice ? (
            <div className="flex items-baseline">
              <span className={cn(
                "text-5xl font-bold text-gray-900 dark:text-gray-100",
                tier.highlighted && "text-brand-green dark:text-accent-green"
              )}>${price}</span>
              <span className="text-gray-600 ml-2 dark:text-gray-400">/{paymentFrequency.replace('ly', '')}</span>
            </div>
          ) : (
            <span className={cn(
              "text-5xl font-bold text-gray-900 dark:text-gray-100",
              tier.highlighted && "text-brand-green dark:text-accent-green"
            )}>{price}</span>
          )}
        </div>
        <ul className="space-y-4 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start text-gray-700 dark:text-gray-300">
              <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-brand-green dark:text-accent-green rounded-full bg-brand-green/10 dark:bg-accent-green/20 p-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Button 
          className={cn(
            "w-full",
            tier.highlighted && "bg-brand-green dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90 hover:bg-brand-green/90"
          )}
          variant={tier.highlighted ? "default" : "outline"} 
          asChild
        >
          <Link to={linkDestination}>{tier.cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
