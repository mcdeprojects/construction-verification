import React from "react";

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
    const { threshold = 0.1, rootMargin = '100px', triggerOnce = true } = options;
    const [isInView, setIsInView] = React.useState(false);
    const [hasBeenInView, setHasBeenInView] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;
                setIsInView(inView);

                if (inView && !hasBeenInView) {
                    setHasBeenInView(true);
                }

                // Si triggerOnce es true, desconecta el observer después del primer trigger
                if (inView && triggerOnce) {
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

    return { ref, isInView, hasBeenInView };
};
