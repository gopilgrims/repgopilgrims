// Shared destinations data for consistent use across the platform
export const DESTINATIONS = [
  { value: 'hajj', label: 'Hajj' },
  { value: 'umrah', label: 'Umrah' },
  { value: 'iraq', label: 'Iraq (Karbala, Najaf & Kadhimain)' },
  { value: 'iran', label: 'Iran (Qom & Mashhad)' },
  { value: 'syria', label: 'Syria (Damascus)' },
  { value: 'iran-iraq', label: 'Iran & Iraq Combined' },
  { value: 'umrah-iran-iraq', label: 'Umrah, Iran & Iraq' },
  { value: 'others', label: 'Custom Ziarat' },
] as const;

export type DestinationValue = typeof DESTINATIONS[number]['value'];