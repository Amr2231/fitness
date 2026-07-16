import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window back to the top whenever the route changes.
// React Router (unlike a classic full page navigation) keeps the
// current scroll position when navigating client-side, so without
// this the user can land on a brand new page while still scrolled
// down to wherever they were on the previous one.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
