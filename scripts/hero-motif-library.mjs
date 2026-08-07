// A library of small, cheap animated micro-motifs used to add a unique,
// subtle "alive" accent to an already-rendered hero image, without touching
// or needing to know that image's original text layout. Every motif is
// designed to render inside a small ~70x70 safe zone in the top-right
// corner (above the category label, right of the brand mark), which stays
// empty across every card in the design system regardless of how long that
// specific article's number/label text is.
//
// Each motif is a function (t, color, cx, cy) => svgSnippetString, where t
// runs 0..1 across the animation loop. Kept intentionally cheap (simple
// shapes, no filters) so N-frame animated webp exports stay close in size
// to the static original.

const TAU = Math.PI * 2;

export const MOTIFS = {
  pulsingDot: (t, color, cx, cy) => {
    const pulse = 0.5 + 0.5 * Math.sin(t * TAU);
    const ringR = 7 + pulse * 5;
    const ringOp = (1 - pulse) * 0.35;
    return `<circle cx="${cx}" cy="${cy}" r="${ringR.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${ringOp.toFixed(2)}"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="${color}" opacity="${(0.55 + pulse * 0.45).toFixed(2)}"/>`;
  },

  blinkCursor: (t, color, cx, cy) => {
    const on = (t % 1) < 0.55;
    return `<rect x="${cx - 2}" y="${cy - 12}" width="4" height="24" fill="${color}" opacity="${on ? 0.9 : 0}"/>`;
  },

  orbitDot: (t, color, cx, cy) => {
    const a = t * TAU;
    const r = 16;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.6;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1" opacity="0.25"/>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${color}"/>`;
  },

  sweepGlint: (t, color, cx, cy) => {
    const x = cx - 20 + t * 40;
    return `<line x1="${x.toFixed(1)}" y1="${cy - 16}" x2="${(x + 10).toFixed(1)}" y2="${cy + 16}" stroke="${color}" stroke-width="2" opacity="0.55" stroke-linecap="round"/>`;
  },

  chevronBounce: (t, color, cx, cy) => {
    const dy = Math.sin(t * TAU) * 5;
    const y = cy + dy;
    return `<path d="M${cx - 8},${(y - 4).toFixed(1)} L${cx},${(y + 4).toFixed(1)} L${cx + 8},${(y - 4).toFixed(1)}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>`;
  },

  dashBreathe: (t, color, cx, cy) => {
    const w = 14 + Math.sin(t * TAU) * 8;
    return `<rect x="${(cx - w / 2).toFixed(1)}" y="${cy - 1.5}" width="${w.toFixed(1)}" height="3" fill="${color}" opacity="0.75"/>`;
  },

  tripleDotWave: (t, color, cx, cy) => {
    let out = '';
    for (let i = 0; i < 3; i++) {
      const phase = (t - i * 0.15 + 1) % 1;
      const scale = 0.5 + 0.5 * Math.sin(phase * TAU);
      out += `<circle cx="${cx - 12 + i * 12}" cy="${cy}" r="${(2 + scale * 2.5).toFixed(1)}" fill="${color}" opacity="${(0.4 + scale * 0.5).toFixed(2)}"/>`;
    }
    return out;
  },

  ringPing: (t, color, cx, cy) => {
    const r = 4 + t * 18;
    const op = Math.max(0, 0.5 - t * 0.5);
    return `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${op.toFixed(2)}"/>
      <circle cx="${cx}" cy="${cy}" r="3.5" fill="${color}" opacity="0.85"/>`;
  },

  plusRotate: (t, color, cx, cy) => {
    const a = t * 360;
    return `<g transform="rotate(${a.toFixed(1)} ${cx} ${cy})" opacity="0.75">
      <line x1="${cx - 9}" y1="${cy}" x2="${cx + 9}" y2="${cy}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy - 9}" x2="${cx}" y2="${cy + 9}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>
    </g>`;
  },

  cornerBrackets: (t, color, cx, cy) => {
    const op = 0.4 + 0.4 * Math.sin(t * TAU);
    const s = 12;
    return `<g opacity="${op.toFixed(2)}" stroke="${color}" stroke-width="1.6" fill="none" stroke-linecap="round">
      <path d="M${cx - s},${cy - 4} L${cx - s},${cy - s} L${cx - 4},${cy - s}"/>
      <path d="M${cx + s},${cy + 4} L${cx + s},${cy + s} L${cx + 4},${cy + s}"/>
    </g>`;
  },

  signalBars: (t, color, cx, cy) => {
    let out = '';
    for (let i = 0; i < 3; i++) {
      const phase = (t - i * 0.2 + 1) % 1;
      const h = 5 + (0.5 + 0.5 * Math.sin(phase * TAU)) * 10;
      out += `<rect x="${cx - 12 + i * 8}" y="${(cy + 8 - h).toFixed(1)}" width="4" height="${h.toFixed(1)}" fill="${color}" opacity="0.8"/>`;
    }
    return out;
  },

  starTwinkle: (t, color, cx, cy) => {
    const s = 0.4 + 0.6 * Math.abs(Math.sin(t * TAU));
    const r1 = 10 * s, r2 = 3 * s;
    const pts = [0, 90, 180, 270].map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      const r = i % 2 === 0 ? r1 : r2;
      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
    });
    return `<polygon points="${pts.join(' ')}" fill="${color}" opacity="${(0.5 + s * 0.4).toFixed(2)}"/>`;
  },

  arrowSlide: (t, color, cx, cy) => {
    const dx = Math.sin(t * TAU) * 8;
    const x = cx + dx;
    return `<path d="M${(x - 8).toFixed(1)},${cy} L${(x + 6).toFixed(1)},${cy} M${(x + 1).toFixed(1)},${cy - 5} L${(x + 6).toFixed(1)},${cy} L${(x + 1).toFixed(1)},${cy + 5}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>`;
  },

  dashedRingRotate: (t, color, cx, cy) => {
    const a = t * 360;
    return `<circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" transform="rotate(${a.toFixed(1)} ${cx} ${cy})"/>`;
  },

  orbitRing: (t, color, cx, cy) => {
    const a = t * TAU;
    const r = 14;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${color}"/>`;
  },

  underlineDraw: (t, color, cx, cy) => {
    const phase = t < 0.5 ? t * 2 : 1;
    const op = t < 0.5 ? 0.85 : Math.max(0, 0.85 - (t - 0.5) * 1.7);
    const w = 20 * phase;
    return `<rect x="${(cx - 10).toFixed(1)}" y="${cy}" width="${w.toFixed(1)}" height="2.4" fill="${color}" opacity="${op.toFixed(2)}"/>`;
  },

  diamondPulse: (t, color, cx, cy) => {
    const s = 6 + Math.sin(t * TAU) * 4;
    return `<polygon points="${cx},${(cy - s).toFixed(1)} ${(cx + s).toFixed(1)},${cy} ${cx},${(cy + s).toFixed(1)} ${(cx - s).toFixed(1)},${cy}" fill="none" stroke="${color}" stroke-width="1.6" opacity="0.75"/>`;
  },

  bracketExpand: (t, color, cx, cy) => {
    const gap = 6 + Math.sin(t * TAU) * 5;
    return `<g stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.75">
      <path d="M${(cx - gap).toFixed(1)},${cy - 8} v16"/>
      <path d="M${(cx + gap).toFixed(1)},${cy - 8} v16"/>
    </g>`;
  },

  tickFade: (t, color, cx, cy) => {
    const op = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * TAU));
    return `<path d="M${cx - 7},${cy} L${cx - 2},${cy + 5} L${cx + 8},${cy - 7}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="${op.toFixed(2)}"/>`;
  },

  compassSpin: (t, color, cx, cy) => {
    const a = t * 360;
    return `<g opacity="0.75">
      <circle cx="${cx}" cy="${cy}" r="12" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.4"/>
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 11}" stroke="${color}" stroke-width="1.8" stroke-linecap="round" transform="rotate(${a.toFixed(1)} ${cx} ${cy})"/>
    </g>`;
  },

  waveArc: (t, color, cx, cy) => {
    const a1 = (t * TAU) % TAU;
    const a2 = a1 + Math.PI * 0.8;
    const p1 = [cx + Math.cos(a1) * 12, cy + Math.sin(a1) * 12];
    const p2 = [cx + Math.cos(a2) * 12, cy + Math.sin(a2) * 12];
    return `<path d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A12,12 0 0 1 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`;
  },
};

export const MOTIF_NAMES = Object.keys(MOTIFS);
