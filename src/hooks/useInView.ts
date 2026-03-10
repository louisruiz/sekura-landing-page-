import { useEffect, useRef, useState } from "react";

export function useInView(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<Element | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return { ref, isInView };
}
