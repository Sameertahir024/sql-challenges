"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Menu, X } from "lucide-react";
import ToggleTheme from "../ToggleTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 ">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">QueryQuest</span>
            <span className="text-xs font-light text-primary ml-1">Arena</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button asChild size="lg" variant="ghost">
            <Link href="/">Practice</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/about">About</Link>
          </Button>
        </nav>

        {/* Actions: Theme Toggle + SignIn */}
        <div className="hidden md:flex items-center space-x-4">
          <ToggleTheme />
          <Button size="lg" variant="outline">
            Sign In
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ToggleTheme />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-background border-t border-border/40">
          <Link
            href="/"
            className="block text-sm font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Practice
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Button
            className="w-full"
            variant="outline"
            size={"lg"}
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Button>
        </div>
      )}
    </header>
  );
}
