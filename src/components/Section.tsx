import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "gradient";
}

const Section = ({ id, title, children, variant = "default" }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`py-20 ${variant === "gradient" ? "bg-gradient-to-b from-background to-secondary/30" : ""}`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-12 text-primary">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
