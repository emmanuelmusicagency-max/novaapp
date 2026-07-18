"use client";

/**
 * Deterministic pseudo-QR pattern rendered as SVG, seeded from the address
 * string so the same address always renders the same pattern. This gives a
 * QR-like visual without depending on an external QR-generation service.
 */
export function AddressQrCode({ value, size = 180 }: { value: string; size?: number }) {
  const grid = 21;
  const cells: boolean[] = [];
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;

  for (let i = 0; i < grid * grid; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    cells.push((seed >>> 16) % 3 !== 0);
  }

  const cellSize = size / grid;

  function isFinderCell(x: number, y: number) {
    const inCorner =
      (x < 7 && y < 7) || (x >= grid - 7 && y < 7) || (x < 7 && y >= grid - 7);
    return inCorner;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white p-2">
      <rect width={size} height={size} fill="white" />
      {Array.from({ length: grid }).map((_, y) =>
        Array.from({ length: grid }).map((_, x) => {
          if (isFinderCell(x, y)) return null;
          const on = cells[y * grid + x];
          if (!on) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#0a0e1a"
            />
          );
        })
      )}
      {[
        [0, 0],
        [grid - 7, 0],
        [0, grid - 7],
      ].map(([fx, fy]) => (
        <g key={`${fx}-${fy}`}>
          <rect x={fx * cellSize} y={fy * cellSize} width={cellSize * 7} height={cellSize * 7} fill="#0a0e1a" />
          <rect
            x={(fx + 1) * cellSize}
            y={(fy + 1) * cellSize}
            width={cellSize * 5}
            height={cellSize * 5}
            fill="white"
          />
          <rect
            x={(fx + 2) * cellSize}
            y={(fy + 2) * cellSize}
            width={cellSize * 3}
            height={cellSize * 3}
            fill="#0a0e1a"
          />
        </g>
      ))}
    </svg>
  );
}
