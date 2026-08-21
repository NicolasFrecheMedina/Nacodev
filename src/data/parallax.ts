export const parallaxConfig = {
  breakpoint: 700,
  amplitude: {
    desktop: { x: 30, y: 24 },
    mobile: { x: 12, y: 9 },
  },
  layers: {
    background: 0.38,
    halo: 0.9,
    depthElements: 1.15,
  },
} as const
