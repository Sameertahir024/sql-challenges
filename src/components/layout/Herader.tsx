import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";

export default function Header() {
  return (
    <header className=" ">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Database className="h-6 w-6 text-primary" />
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">QueryQuest</span>
            <span className="text-xs font-light text-primary">Arena</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button asChild size={"lg"} variant="ghost">
            <Link href="/" className="text-sm font-medium">
              Practice
            </Link>
          </Button>
          <Button size="lg" asChild variant="ghost">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </Button>
        </nav>
        <ToggleTheme />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="lg">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
