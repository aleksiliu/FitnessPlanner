import { useState, useEffect, useRef } from 'react';

export function useTypingAnimation(text: string, typingSpeed: number = 5) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<number | null>(null);

  useEffect(() => {
    if (text && !isTyping) {
      setIsTyping(true);
      setDisplayedText('');
      let i = 0;
      
      const typeText = () => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
          typingRef.current = setTimeout(typeText, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };

      typeText();

      return () => {
        if (typingRef.current) {
          clearTimeout(typingRef.current);
        }
      };
    }
  }, [text, typingSpeed]);

  return { displayedText, isTyping };
}