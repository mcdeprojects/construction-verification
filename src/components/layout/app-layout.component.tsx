import React from "react";
import { Toaster } from "@/components/ui/sonner"
import { Header } from "./header.component";
import { ThemeProvider } from "../theme-provider";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className='min-h-screen'>
                <Header />
                <main>
                    {children}
                </main>
                <Toaster richColors />
            </div>
        </ThemeProvider>
    )
}