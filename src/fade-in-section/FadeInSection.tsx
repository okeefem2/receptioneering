import React from 'react';

interface FadeInSectionProps {
    fadeInDirection: 'up' | 'down' | 'left' | 'right';
    full?: boolean;
}
// https://fettblog.eu/typescript-react/hooks/#useref
export const FadeInSection = ({ fadeInDirection = 'up', full = false, ...props }) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<any>();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        // TODO
        <div
            className={`fade-in-section ${full ? 'fade-in-section--full' : ''} fade-in-section--${fadeInDirection} ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}
