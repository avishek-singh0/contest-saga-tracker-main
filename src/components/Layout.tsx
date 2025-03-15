
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 py-8 animate-fade-in">
        {children}
      </main>
      <footer className="w-full py-6 border-t border-border">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Contest Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
