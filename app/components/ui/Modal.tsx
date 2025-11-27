import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    cardBg: string;
    cardBorder: string;
    accentColor?: string;
    showCloseButton?: boolean;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    cardBg,
    cardBorder,
    accentColor,
    showCloseButton = true,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            requestAnimationFrame(() => {
                modalRef.current?.focus();
            });
        } else {
            previousFocusRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", handleTab);
        return () => document.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-40 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                ref={modalRef}
                className="w-full max-w-md rounded-2xl shadow-2xl p-6 relative"
                style={{
                    backgroundColor: cardBg,
                    borderColor: cardBorder,
                    borderWidth: "2px",
                }}
                tabIndex={-1}
            >
                {showCloseButton && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
                        aria-label="Close modal"
                    >
                        <X size={20} className="text-white" />
                    </button>
                )}

                {title && (
                    <h2
                        id="modal-title"
                        className="text-2xl font-bold mb-6"
                        style={{ color: accentColor }}
                    >
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
};

Modal.displayName = "Modal";

export default Modal;
