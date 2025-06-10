import Link from "next/link";
import { Button } from "@/components/ui/button";
import ToggleTheme from "../ToggleTheme";
import { Database } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b dark:bg-black bg-white">
          <div className="flex items-center">
            <Database className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ToggleTheme />
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-sm px-4 sm:px-8"
              >
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="text-sm px-4 sm:px-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
