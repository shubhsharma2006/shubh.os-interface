import { useEffect, useState } from 'react';

export default function LiveClock() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const utc = now.toISOString().slice(11, 19);
  return (
    <span className="font-mono">
      <span className="text-primary">●</span> {utc} UTC
    </span>
  );
}
