import { siteDetails } from '@/data';
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="mt-8 text-center text-foreground-accent px-6">
                <p className="text-sm md:text-base">Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="text-sm mt-2 text-gray-500">
                    Desarrolado por{' '}
                    <a
                        href="https://github.com/rojasadrian012"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary-foreground dark:hover:text-white transition-colors duration-200"
                    >
                        Adrian Portillo
                    </a>
                </p>
            </div>
        </footer>
    );
};