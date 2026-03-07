import React from "react";
import clsx from "clsx";

/**
 * Standardized "Well" for component examples.
 * Provides consistent padding, background, and borders.
 */
export const StoryStage = ({
  children,
  className,
  title,
  description
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) => (
  <div className={clsx("space-y-4", className)}>
    {(title || description) && (
      <div className="space-y-1">
        {title && (
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </h3>
        )}
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
    )}
    <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-8 shadow-sm">
      {children}
    </div>
  </div>
);

/**
 * Standardized "Demo Box" for nested items.
 */
export const DemoBox = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "p-6 bg-slate-50 border border-slate-100 rounded-2xl",
      className
    )}
  >
    {children}
  </div>
);

/**
 * Shared brand configuration (for reference)
 */
export const BRAND = {
  primary: "indigo-600",
  secondary: "violet-600",
  neutral: "slate-900"
};

/**
 * Shared class utilities
 */
export const themeClx = {
  well: "bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm",
  button: {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2",
    secondary:
      "bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold py-2 px-6 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-2"
  },
  typography: {
    display:
      "text-4xl md:text-6xl font-black uppercase tracking-tighter bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent",
    heading: "text-2xl font-bold text-slate-900",
    subheading: "text-xs font-black text-indigo-600 uppercase tracking-widest",
    body: "text-slate-600 leading-relaxed"
  }
};
