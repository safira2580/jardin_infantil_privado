import type { ViewStyle } from 'react-native';

export const colors = {
  bg: '#EAF4FB',
  surface: '#FFFFFF',
  ink: '#23324D',
  muted: '#5B6B85',
  line: '#D3E3F0',
  accent: '#F7B32B',
  accentInk: '#4A3300',
  sky: '#2F7FC1',
  ok: '#2E8B63',
  warn: '#D9534F',
};

export type BlockKey = 'coral' | 'sun' | 'blue' | 'green';

export const blocks: Record<BlockKey, { main: string; dark: string; tint: string; onMain: string }> = {
  coral: { main: '#E8574F', dark: '#B93D36', tint: '#FDE5E2', onMain: '#FFFFFF' },
  sun: { main: '#F7B32B', dark: '#C98A0C', tint: '#FEF1CF', onMain: '#4A3300' },
  blue: { main: '#2F7FC1', dark: '#1F5E94', tint: '#DCEBF7', onMain: '#FFFFFF' },
  green: { main: '#2E8B63', dark: '#1F6847', tint: '#D8EEE3', onMain: '#FFFFFF' },
};

const GRUPO_LOOK: Record<string, { tone: BlockKey; emoji: string }> = {
  'grupo-01': { tone: 'coral', emoji: '🍼' },
  'grupo-02': { tone: 'sun', emoji: '👣' },
  'grupo-03': { tone: 'blue', emoji: '🎵' },
  'grupo-04': { tone: 'green', emoji: '⭐' },
  'grupo-05': { tone: 'coral', emoji: '🌳' },
  'grupo-06': { tone: 'sun', emoji: '🚀' },
};

export function lookDeGrupo(id: string): { tone: BlockKey; emoji: string } {
  return GRUPO_LOOK[id] ?? { tone: 'blue', emoji: '🧸' };
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };
export const font = { sm: 13, md: 15, lg: 18, xl: 24, xxl: 30 };

export const blockCard: ViewStyle = {
  backgroundColor: colors.surface,
  borderRadius: radius.lg,
  borderWidth: 2,
  borderColor: colors.line,
  borderBottomWidth: 5,
};

export const pressedBlock: ViewStyle = { transform: [{ translateY: 2 }], opacity: 0.95 };
