
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { NumberFlow } from "@number-flow/react";

type Plan = {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  isPopular?: boolean;
};

type PricingProps = {
  title: string;
  description: string;
  plans: Plan[];
};

export function Pricing({ title, description, plans }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container max-w-5xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-green mb-2">{title}</h2>
        <p className="mx-auto max-w-lg text-gray-600 whitespace-pre-line">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 space-x-3">
        <span className="text-sm font-medium">Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          id="billing-switch"
        />
        <span className="text-sm font-medium">
          Yearly <span className="text-green-500 font-semibold">(-20%)</span>
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {plans.map((plan, index) => {
          const priceNum =
            plan.name === "ENTERPRISE"
              ? null
              : parseInt(isYearly ? plan.yearlyPrice : plan.price);

          return (
            <div
              key={index}
              className={cn(
                "flex-1 rounded-xl p-6 border relative",
                plan.isPopular
                  ? "bg-brand-green/5 border-brand-green shadow-xl shadow-brand-green/5"
                  : "bg-white border-gray-200 shadow-lg"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-brand-green text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="">
                <h3
                  className={cn(
                    "text-lg font-bold",
                    plan.isPopular ? "text-brand-green" : "text-gray-900"
                  )}
                >
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <div className="mt-5">
                {plan.name === "ENTERPRISE" ? (
                  <div>
                    <div className="text-5xl font-bold text-gray-900">
                      Custom
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-gray-500 mr-1">$</span>
                    <NumberFlow
                      value={priceNum || 0}
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      formatValue={(value) => `${value}`}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange={true}
                      className="text-5xl font-bold text-gray-900"
                    />
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                )}
                {plan.name !== "ENTERPRISE" && isYearly && (
                  <div className="text-sm text-green-600 mt-1">
                    Billed yearly (save 20%)
                  </div>
                )}
                {plan.name !== "ENTERPRISE" && !isYearly && (
                  <div className="text-sm text-gray-500 mt-1">
                    Billed monthly
                  </div>
                )}
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2
                      className={cn(
                        "h-5 w-5 shrink-0 mr-2",
                        plan.isPopular ? "text-brand-green" : "text-gray-400"
                      )}
                    />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: plan.isPopular ? "default" : "outline",
                    }),
                    "w-full",
                    plan.isPopular && "bg-brand-green hover:bg-brand-green/90"
                  )}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
