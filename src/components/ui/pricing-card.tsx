
"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

  return (
    <Card className={cn(
      "flex flex-col", 
      tier.highlighted 
        ? "border border-brand-green/20 shadow-xl bg-gradient-to-b from-brand-green/5 to-brand-green/10 dark:from-brand-green/20 dark:to-brand-green/30" 
        : tier.popular 
          ? "border-2 border-brand-green shadow-xl" 
          : "shadow-md"
    )}>
      <CardHeader className={cn(
        "flex-1",
        tier.highlighted && "bg-transparent"
      )}>
        <CardTitle className={cn(
          "text-2xl font-semibold",
          tier.highlighted && "text-brand-green"
        )}>
          {tier.name}
        </CardTitle>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4 flex items-baseline">
          {isNumericPrice ? (
            <>
              <span className={cn(
                "text-5xl font-bold text-gray-900 dark:text-gray-100",
                tier.highlighted && "text-brand-green"
              )}>${price}</span>
              <span className="text-gray-600 ml-2 dark:text-gray-400">/{paymentFrequency.replace('ly', '')}</span>
            </>
          ) : (
            <span className={cn(
              "text-5xl font-bold text-gray-900 dark:text-gray-100",
              tier.highlighted && "text-brand-green"
            )}>{price}</span>
          )}
        </div>
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
              <Check className={cn(
                "w-4 h-4 mr-2", 
                tier.highlighted ? "text-brand-green" : "text-brand-green"
              )} />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Button 
          className="w-full" 
          variant={tier.highlighted ? "default" : "outline"} 
          asChild
          style={tier.highlighted ? { backgroundColor: '#1A392A', borderColor: '#1A392A' } : {}}
        >
          <a href="#">{tier.cta}</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
