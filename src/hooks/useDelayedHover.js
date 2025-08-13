import { useState, useRef } from 'react';

export default function useDelayedHover(delay = 200) {
  const [idx, setIdx] = useState(null);
  const timerRef = useRef(null);

  const enter = (i) => {
    clearTimeout(timerRef.current);
    setIdx(i);
  };

  const leave = () => {
    timerRef.current = setTimeout(() => setIdx(null), delay);
  };

  return { idx, enter, leave };
}