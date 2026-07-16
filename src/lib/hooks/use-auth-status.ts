import { useEffect, useState } from "react";

// Custom event so components in the same tab can react instantly
// when the token is set/removed (localStorage's own "storage" event
// only fires in *other* tabs).
export const AUTH_CHANGED_EVENT = "auth-changed";

export const notifyAuthChanged = () => {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token"),
  );

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));

    window.addEventListener(AUTH_CHANGED_EVENT, syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  return isAuthenticated;
}
