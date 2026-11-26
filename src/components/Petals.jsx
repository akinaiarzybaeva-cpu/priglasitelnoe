import { useMemo } from 'react';

/** Акырын түшүп жаткан гүл желекчелери (CSS анимациясы — телефондо жеңил иштейт). */
export default function Petals({ count = 14 }) {
  const petals = useMemo(() => {
    // Туруктуу "кокустук" — ар жаңыртууда бирдей көрүнүш
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rnd() * 100,
      size: 8 + rnd() * 10,
      duration: 11 + rnd() * 10,
      delay: -rnd() * 20,
      drift: (rnd() - 0.5) * 140,
      spin: 180 + rnd() * 360,
      tone: i % 3,
    }));
  }, [count]);

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal petal--${p.tone}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
