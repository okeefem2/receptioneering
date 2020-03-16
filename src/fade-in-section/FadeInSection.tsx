import React, { ReactNode } from 'react';

interface FadeInSectionProps {
    fadeInDirection?: 'up' | 'down' | 'left' | 'right';
    full?: boolean;
    centered?: boolean;
    children?: ReactNode;
}
// https://fettblog.eu/typescript-react/hooks/#useref
export const FadeInSection: React.FC<FadeInSectionProps> = ({
    fadeInDirection = 'up',
    full = false,
    centered = false,
    ...props
}: FadeInSectionProps) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<any>();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);

    const directionClass = `fade-in-section--${fadeInDirection}`;
    const isVisibleClass = isVisible ? 'is-visible' : '';
    const fullClass = full ? 'fade-in-section--full' : '';
    const centeredClass = centered ? 'fade-in-section--centered' : '';

    return (
        <div
            className={`fade-in-section ${fullClass} ${directionClass} ${isVisibleClass} ${centeredClass}`}
            ref={domRef}
        >
            <>{props.children}</>
        </div>
    );
};
