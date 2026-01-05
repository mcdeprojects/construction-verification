import { useInView } from '@/hooks';
import React, { Suspense } from 'react';


interface LazySectionProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
    id?: string;
    threshold?: number;
    rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
    children,
    fallback,
    className = '',
    id,
    threshold = 0.1,
    rootMargin = '200px' // Carga 200px antes de que sea visible
}) => {
    const { ref, hasBeenInView } = useInView({ threshold, rootMargin, triggerOnce: true });

    return (
        <section ref={ref} className={className} id={id}>
            {hasBeenInView ? (
                <Suspense fallback={fallback}>
                    {children}
                </Suspense>
            ) : (
                <div className="h-96"> {/* Placeholder para mantener el layout */}
                    {fallback}
                </div>
            )}
        </section>
    );
};