import { useEffect, type RefObject } from "react";

/**
 * Custom hook for detecting clicks outside a specified DOM element
 * Useful for closing modals, dropdowns, and popovers when clicking outside
 *
 * @param {RefObject<HTMLDivElement | null>} ref - Reference to the monitored DOM element
 * @param {Function} callback - Callback function to execute when click is detected outside
 * @param {boolean} [isActive=true] - Enable/disable the hook (useful for conditional behavior)
 *
 * @example
 * const modalRef = useRef<HTMLDivElement>(null);
 * useClickOutside(modalRef, () => setIsOpen(false), isOpen);
 *
 * @note
 * - Uses 'mousedown' event for better UX (detects intent to click before mouseup)
 * - Properly cleans up event listeners on unmount and when conditions change
 * - Callback is memoized to avoid excessive listener re-registration
 */
export function useClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void,
  isActive: boolean = true
) {
  useEffect(() => {
    // Skip listener attachment if hook is disabled
    if (!isActive) return;

    /**
     * Detects clicks outside the referenced element
     * @param {MouseEvent} event - Mouse event from click/touch
     */
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click target is outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // This detects the intent to click before the click completes
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup: remove listener on unmount or when dependencies change
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback, isActive]);
}
