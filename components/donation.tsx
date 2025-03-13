'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/components/ui/use-mobile";
import { ChevronUp, ChevronDown } from "lucide-react";

export function Donation() {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState('5');
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const predefinedAmounts = ['5', '10', '20', '50'];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleDonate = async () => {
    // Here you would integrate with your payment processor
    window.open(`https://www.paypal.com/paypalme/thanhphuchuynh/${amount}`, '_blank');
  };

  const content = (
    <>
      <CardHeader>
        <CardTitle>Support Time Speaking</CardTitle>
        <CardDescription>Help us keep the project running and add more features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {predefinedAmounts.map((preset) => (
            <Button
              key={preset}
              variant={amount === preset ? "default" : "outline"}
              onClick={() => setAmount(preset)}
              className="w-full"
            >
              ${preset}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom amount"
            min="1"
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDonate} className="w-full">
          Donate Now
        </Button>
      </CardFooter>
    </>
  );

  if (isMobile) {
    return (
      <Card className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300" 
            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(calc(100% - 3.5rem))' }}>
        <div className="p-4 flex justify-between items-center cursor-pointer"
             onClick={() => setIsOpen(!isOpen)}>
          <CardTitle>Support Time Speaking</CardTitle>
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </div>
        {content}
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      {content}
    </Card>
  );
}
