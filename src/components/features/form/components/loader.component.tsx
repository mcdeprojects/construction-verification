import type React from "react";

export const Loader: React.FC = () => (
  <div className="w-full p-6 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900">
    <div className="flex items-center justify-center space-x-2">
      <div
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  </div>
);
