import { useEffect, useState } from 'react';

const timeFmt =
  typeof Intl !== 'undefined' && Intl.DateTimeFormat
    ? new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    : null;

export function useClock() {
  const [value, setValue] = useState(() => timeFmt?.format(new Date()) ?? '00:00:00');

  useEffect(() => {
    const id = window.setInterval(() => setValue(timeFmt?.format(new Date()) ?? '00:00:00'), 1000);
    return () => window.clearInterval(id);
  }, []);

  return value;
}
