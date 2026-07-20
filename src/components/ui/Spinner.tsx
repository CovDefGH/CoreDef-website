import { LoaderIcon } from "lucide-react";
import React from "react";

export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={`animate-spin ${className || ""}`}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
    </div>
  );
}
