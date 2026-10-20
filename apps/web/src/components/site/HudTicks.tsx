export function HudTicks() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
    const major = i % 6 === 0;
    const r1 = 258;
    const r2 = major ? 244 : 252;
    return {
      x1: 300 + Math.cos(angle) * r1,
      y1: 300 + Math.sin(angle) * r1,
      x2: 300 + Math.cos(angle) * r2,
      y2: 300 + Math.sin(angle) * r2,
      major
    };
  });

  return (
    <g className="hud-ticks">
      {ticks.map((tick, i) => (
        <line
          key={i}
          x1={tick.x1.toFixed(2)}
          y1={tick.y1.toFixed(2)}
          x2={tick.x2.toFixed(2)}
          y2={tick.y2.toFixed(2)}
          opacity={tick.major ? 0.8 : undefined}
        />
      ))}
    </g>
  );
}
