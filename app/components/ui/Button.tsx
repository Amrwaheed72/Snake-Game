import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    backgroundColor?: string;
    hoverColor?: string;
    icon?: ReactNode;
}

const Button = ({
    variant = "primary",
    size = "md",
    children,
    backgroundColor,
    hoverColor,
    icon,
    className = "",
    ...props
}: ButtonProps) => {
    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const baseClasses =
        "flex items-center justify-center gap-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

    return (
        <button
            type="button"
            className={`${baseClasses} ${sizeClasses[size]} ${className}`}
            style={{
                backgroundColor: backgroundColor || undefined,
            }}
            onMouseEnter={(e) => {
                if (hoverColor) {
                    e.currentTarget.style.backgroundColor = hoverColor;
                }
            }}
            onMouseLeave={(e) => {
                if (backgroundColor) {
                    e.currentTarget.style.backgroundColor = backgroundColor;
                }
            }}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
};

Button.displayName = "Button";

export default Button;
