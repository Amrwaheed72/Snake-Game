import { useEffect, useRef } from "react";

interface AccessibleAnnouncerProps {
  message: string;
  priority?: "polite" | "assertive";
}

const AccessibleAnnouncer = ({
  message,
  priority = "polite",
}: AccessibleAnnouncerProps) => {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && announcerRef.current) {
      announcerRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      });
    }
  }, [message]);

  return (
    <div
      ref={announcerRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
};

export const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="absolute left-[-10000px] w-px h-px overflow-hidden">
      {children}
    </span>
  );
};

AccessibleAnnouncer.displayName = "AccessibleAnnouncer";

export default AccessibleAnnouncer;
