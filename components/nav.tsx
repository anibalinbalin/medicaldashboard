import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Home, Users, UserPlus } from "lucide-react";

interface NavProps {
  items: {
    title: string;
    href: string;
    icon?: string;
  }[];
}

const iconMap: { [key: string]: LucideIcon } = {
  home: Home,
  users: Users,
  "user-plus": UserPlus,
};

export function Nav({ items }: NavProps) {
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
