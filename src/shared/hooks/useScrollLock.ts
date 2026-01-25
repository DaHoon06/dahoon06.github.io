import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean = true) => {
    useEffect(() => {
        if (!isLocked) return;

        const preventScroll = (event: Event) => {
            const target = event.target as HTMLElement;

            // 스크롤 가능한 요소인지 확인
            const isScrollable = (element: HTMLElement | null): boolean => {
                if (!element) return false;

                const hasOverflow = element.scrollHeight > element.clientHeight;
                const overflowY = window.getComputedStyle(element).overflowY;
                const isOverflowScrollable = overflowY === 'auto' || overflowY === 'scroll';

                return hasOverflow && isOverflowScrollable;
            };

            // 타겟 요소부터 상위로 올라가며 스크롤 가능한 요소 찾기
            let currentElement: HTMLElement | null = target;
            while (currentElement && currentElement !== document.body) {
                if (isScrollable(currentElement)) {
                    return; // 스크롤 가능한 요소 내부면 preventDefault 하지 않음
                }
                currentElement = currentElement.parentElement;
            }

            // body에서의 스크롤만 막음
            event.preventDefault();
        };

        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.body.addEventListener('touchmove', preventScroll, { passive: false });
        document.body.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.body.removeEventListener('touchmove', preventScroll);
            document.body.removeEventListener('wheel', preventScroll);
        };
    }, [isLocked]);
};
