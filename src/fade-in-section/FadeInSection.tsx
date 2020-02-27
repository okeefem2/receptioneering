import React from 'react';

// https://fettblog.eu/typescript-react/hooks/#useref
export const FadeInSection = (props: any) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<any>();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}
