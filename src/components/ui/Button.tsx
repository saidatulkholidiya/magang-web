import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import styles from "./Button.module.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "danger";
  ukuran?: "sm" | "md";
};

export function Button({ variant = "primary", ukuran = "md", className, children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={cx(styles.button, styles[variant], styles[ukuran], className)} {...rest}>
      {children}
    </button>
  );
}