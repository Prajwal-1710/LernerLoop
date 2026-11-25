"use client";

import * as React from "react";
import { WifiOff, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium">
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3" />
          <Badge variant="success">Online</Badge>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <Badge variant="error">Offline</Badge>
        </>
      )}
    </div>
  );
}
