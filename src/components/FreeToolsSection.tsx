
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function FreeToolsSection() {
  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Free Tools for Entrepreneurs
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                Use our free tools to improve your productivity and focus on what matters most for your business.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-green-100 rounded-full w-fit">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Time Wasters Audit</h3>
                <p className="text-gray-500 flex-grow">
                  Identify where you're wasting time and how to reclaim it for growth activities.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/time-wasters-audit">Start Audit</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-blue-100 rounded-full w-fit">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Maker-Manager Quiz</h3>
                <p className="text-gray-500 flex-grow">
                  Discover if you're more of a maker or manager and optimize your schedule accordingly.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/maker-manager-quiz">Take Quiz</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="p-2 bg-purple-100 rounded-full w-fit">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">First Paying Customer Finder</h3>
                <p className="text-gray-500 flex-grow">
                  Find your first paying customers with our 3-step AI-powered tool.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/customer-finder">Find Customers</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
