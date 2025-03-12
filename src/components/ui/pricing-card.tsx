
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
      tier.highlighted ? "border-2 border-brand-green shadow-xl" : "",
      tier.popular ? "border-2 border-brand-green shadow-xl" : "shadow-md"
    )}>
      <CardHeader className="flex-1">
        <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4 flex items-baseline">
          {isNumericPrice ? (
            <>
              <span className="text-5xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600 ml-2">/{paymentFrequency.replace('ly', '')}</span>
            </>
          ) : (
            <span className="text-5xl font-bold text-gray-900">{price}</span>
          )}
        </div>
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-700">
              <Check className="w-4 h-4 mr-2 text-brand-green" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Button className="w-full" variant={tier.highlighted ? "default" : "outline"} asChild>
          <a href="#">{tier.cta}</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
