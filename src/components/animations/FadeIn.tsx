import React, { useState, useEffect } from 'react'

interface FadeInProps {
    children: React.ReactNode
    delay?: number
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = React.useRef<HTMLDivElement | null>(null); // Referencia al elemento

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observerInstance.unobserve(entry.target); // Dejar de observar después de ser visible
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect(); // Asegurar que el observer se limpie al desmontar el componente
        };
    }, []);

    return (
        <div
            ref={elementRef}
            style={{ transitionDelay: `${delay}ms` }} // Aplicando el delay con style
            className={`transition-opacity duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
        >
            {children}
        </div>
    );
}
