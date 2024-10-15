// pages/dashboard.tsx
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react"; // For icons

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <div className="flex-1 p-8  px-20 space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold"></h1>
          <UserButton />
        </div>

        {/* Introduction Section */}
        <Card className="bg-gradient-to-r px from-blue-500 via-teal-400 to-green-500 text-white shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold">Connecting Influencers with Brands</h2>
            <p className="mt-4 text-lg">
              TalentLink is your go-to platform for managing sponsorships and posting influencer job
              openings. Our mission is to bridge the gap between brands and talented influencers, 
              helping them create valuable collaborations.
            </p>
            <Button variant="outline" size="lg" className="mt-6">
              Learn More
              <ArrowRight className="ml-2" />
            </Button>
          </CardContent>
        </Card>
        

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Manage Sponsorships</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Simplify your sponsorship process with automated tracking and insightful data on influencer engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Post Job Openings</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Post new job roles for influencers and content creators, and get the best talent aligned with your brand.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent className="text-center">
              <h3 className="text-2xl font-semibold">Collaborate Effectively</h3>
              <Separator className="my-4" />
              <p className="text-muted-foreground">
                Use our platform’s tools to easily communicate and collaborate with influencers for impactful campaigns.
              </p>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
