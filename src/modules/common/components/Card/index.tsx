import styles from "./Card.module.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
}

export default function Card({
  children,
  className,
  isFullWidth,
  ...rest
}: CardProps) {
  return (
    <div
      className={`${styles.root} ${isFullWidth ? styles.fullWidth : ""} ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
