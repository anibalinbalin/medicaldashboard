import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import "./globals.css";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";


// Initialize Geist Sans
const fontSans = GeistSans

export const metadata: Metadata = {
  title: "Medical Dashboard",
  description: "Dashboard for managing patient information",
};

interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

const defaultNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "home",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: "users",
  },
  {
    title: "Registration",
    href: "/registration",
    icon: "user-plus",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6">
                <div className="flex h-16 items-center justify-between">
                  <h1 className="text-xl font-bold text-foreground">Medical Dashboard</h1>
                  <ModeToggle />
                </div>
                <Nav items={defaultNavItems} />
              </div>
            </div>
            <div className="md:pl-72">
              <main className="p-8 bg-background">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
