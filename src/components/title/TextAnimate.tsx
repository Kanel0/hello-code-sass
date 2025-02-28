import { useRef, useEffect, useState } from 'react';
import { EasingFunction } from '@react-spring/types';
import { animated, useSprings } from '@react-spring/web';

interface AnimationStep {
  filter: string;
  opacity: number;
  transform: string;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationStep;
  animationTo?: AnimationStep[];
  easing?: EasingFunction | ((t: number) => number);
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const completions = useRef(elements.map(() => false));

  const defaultFrom: AnimationStep = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
    : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo: AnimationStep[] = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      }, { threshold, rootMargin });
  
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [threshold, rootMargin]);
  

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom ?? defaultFrom,
      to: inView ? (animationTo ?? defaultTo) : (animationFrom ?? defaultFrom),
      delay: i * delay,
      config: { easing },
      onRest: () => {
        completions.current[i] = true;
        if (completions.current.every(Boolean) && onAnimationComplete) {
          onAnimationComplete();
        }
      },
    }))
  );
  
  

  return (
    <p ref={ref} className={`blur-text ${className} inline-flex flex-wrap`}>
  {springs.map((props, index) => (
  <animated.span
    key={`${elements[index]}-${index}`}
    style={props}
    className="inline-block will-change-[transform,filter,opacity]"
  >
    {elements[index] === ' ' ? '\u00A0' : elements[index]}
    {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
  </animated.span>
))}

    </p>
  );
};

export default BlurText;