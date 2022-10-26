import { useEffect, useState } from 'react';

export const useSideNav = () => {
    const [isOpen, setOpen] = useState(false);
    const [alpha, setAlpha] = useState(0.2);
    const calcAlpha = () => Math.min((window.scrollY ?? 500) / 500 + 0.1, 0.7);

    useEffect(() => {
        const handleScroll = () => {
            setAlpha(calcAlpha());
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const setOpenProxy = (isOpen: boolean) => {
        if (isOpen) {
            document.querySelector('body')?.classList.add('clamp-height');
            setAlpha(0.9);
        } else {
            document.querySelector('body')?.classList.remove('clamp-height');
            setAlpha(calcAlpha());
        }
        setOpen(isOpen);
    };
    return {
        isOpen,
        alpha,
        onOpen: () => setOpenProxy(true),
        onClose: () => setOpenProxy(false),
        onToggle: () => setOpenProxy(!isOpen),
    };
};
