import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("label-mono", className)} {...rest}>
      {children}
    </p>
  );
}
