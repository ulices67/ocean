import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getAuthSession } from "@/shared/api";
import AppFrame from "@/features/navigation/ui/AppFrame";

export function AuthLock({ children }: { children: React.ReactNode }) {
  return <AppFrame>{children}</AppFrame>;
}

export default AuthLock;
