import { useId } from 'react';

/* ------------------------------------------------------------------
   Декоративдик SVG элементтер: гүл, лаванда бутагы, бурчтагы гүл
   композициясы жана алтын бөлгүч. Бардыгы вектордук — ар кандай
   экранда тунук көрүнөт.
------------------------------------------------------------------- */

function FlowerShape({ cx = 0, cy = 0, r = 1, rotate = 0, ids }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${r})`}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={`o${i}`}
          cx="0"
          cy="-21"
          rx="13"
          ry="22"
          fill={`url(#${ids.outer})`}
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.4"
          transform={`rotate(${i * 60})`}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={`i${i}`} cx="0" cy="-12" rx="8" ry="13" fill={`url(#${ids.inner})`} transform={`rotate(${i * 60 + 30})`} />
      ))}
      <circle r="7" fill={`url(#${ids.center})`} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={`d${i}`} r="1.3" cx="0" cy="-10" fill="var(--gold)" transform={`rotate(${i * 45})`} />
      ))}
    </g>
  );
}

function FlowerDefs({ ids }) {
  return (
    <defs>
      <radialGradient id={ids.outer} cx="50%" cy="85%" r="90%">
        <stop offset="0%" stopColor="var(--lavender-300)" />
        <stop offset="100%" stopColor="var(--lavender-200)" />
      </radialGradient>
      <radialGradient id={ids.inner} cx="50%" cy="90%" r="90%">
        <stop offset="0%" stopColor="var(--lavender-500)" />
        <stop offset="100%" stopColor="var(--lavender-200)" />
      </radialGradient>
      <radialGradient id={ids.center}>
        <stop offset="0%" stopColor="var(--gold-light)" />
        <stop offset="100%" stopColor="var(--gold)" />
      </radialGradient>
    </defs>
  );
}

function useFlowerIds() {
  const id = useId().replace(/:/g, '');
  return { outer: `fo${id}`, inner: `fi${id}`, center: `fc${id}` };
}

/** Жалгыз гүл */
export function Flower({ size = 60, className = '', style }) {
  const ids = useFlowerIds();
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true">
      <FlowerDefs ids={ids} />
      <FlowerShape ids={ids} r={1.05} />
    </svg>
  );
}

/** Лаванда бутагы */
export function LavenderSprig({ height = 140, className = '', style }) {
  const buds = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg className={className} style={style} height={height} viewBox="0 0 40 160" aria-hidden="true">
      <path d="M20 158 C 21 120, 18 70, 20 8" stroke="#9fae95" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M20 128 C 10 118, 6 104, 7 92" stroke="#9fae95" strokeWidth="1.2" fill="none" />
      <ellipse cx="9" cy="104" rx="2.6" ry="11" fill="#b4c0aa" transform="rotate(-18 9 104)" />
      <ellipse cx="29" cy="116" rx="2.4" ry="10" fill="#b4c0aa" transform="rotate(22 29 116)" />
      {buds.map((i) => {
        const y = 10 + i * 5.4;
        const left = i % 2 === 0;
        const x = left ? 16.5 : 23.5;
        const shade = i < 4 ? 'var(--lavender-500)' : i < 10 ? 'var(--lavender-300)' : 'var(--lavender-200)';
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={3.4 - i * 0.07}
            ry={4.8 - i * 0.08}
            fill={shade}
            transform={`rotate(${left ? -28 : 28} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
}

/** Бурчтагы гүл композициясы. position: 'tl' | 'tr' | 'bl' | 'br' */
export function FloralCorner({ position = 'tl', size = 190, className = '' }) {
  const ids = useFlowerIds();
  const flip = {
    tl: 'scale(1,1)',
    tr: 'scale(-1,1)',
    bl: 'scale(1,-1)',
    br: 'scale(-1,-1)',
  }[position];
  return (
    <svg
      className={`floral-corner floral-corner--${position} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ transform: flip }}
      aria-hidden="true"
    >
      <FlowerDefs ids={ids} />
      {/* бутак */}
      <path d="M-5 150 C 40 120, 70 80, 150 -5" stroke="#a9b69f" strokeWidth="1.6" fill="none" />
      <path d="M-5 60 C 30 70, 60 60, 85 30" stroke="#a9b69f" strokeWidth="1.2" fill="none" />
      {/* жалбырактар */}
      {[
        [30, 128, -40], [58, 102, -55], [92, 62, -38], [118, 34, -52],
        [44, 104, 35], [76, 84, 20], [108, 52, 30], [22, 66, -15], [52, 56, 25],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="13" fill={i % 2 ? '#c2ccb8' : '#aebba3'} transform={`rotate(${r} ${x} ${y})`} opacity="0.9" />
      ))}
      {/* алтын бүчүрлөр */}
      {[[135, 20], [70, 40], [12, 140], [150, 40]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="var(--gold)" opacity="0.85" />
      ))}
      <FlowerShape ids={ids} cx={34} cy={36} r={0.82} rotate={10} />
      <FlowerShape ids={ids} cx={88} cy={100} r={0.48} rotate={-15} />
      <FlowerShape ids={ids} cx={8} cy={98} r={0.38} rotate={25} />
    </svg>
  );
}

/** Алтын бөлгүч */
export function Divider({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`divider ${className}`} width="220" height="24" viewBox="0 0 220 24" aria-hidden="true">
      <defs>
        <linearGradient id={`dl${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
        <linearGradient id={`dr${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="12" x2="92" y2="12" stroke={`url(#dl${id})`} strokeWidth="1" />
      <line x1="128" y1="12" x2="220" y2="12" stroke={`url(#dr${id})`} strokeWidth="1" />
      <circle cx="98" cy="12" r="1.6" fill="var(--gold)" />
      <circle cx="122" cy="12" r="1.6" fill="var(--gold)" />
      <path d="M110 18.5s-7-4.3-7-9a4 4 0 0 1 7-2.6 4 4 0 0 1 7 2.6c0 4.7-7 9-7 9z" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
    </svg>
  );
}
