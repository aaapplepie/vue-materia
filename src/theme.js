import { createTheme } from '@mui/material/styles';

export const REF_COLOR  = '#42A5F5'; // blue
export const COMP_COLOR = '#FFA726'; // orange

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e1a',
      paper: '#111827',
    },
    primary:   { main: REF_COLOR },
    secondary: { main: COMP_COLOR },
    success:   { main: '#4CAF50' },
    error:     { main: '#F44336' },
    warning:   { main: '#FFA726' },
    info:      { main: '#29B6F6' },
    text: {
      primary:   '#E8EAF0',
      secondary: '#8892A4',
    },
    divider: '#1E2A3A',
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600 },
    overline: { letterSpacing: '0.12em', fontSize: '0.68rem' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #1E2A3A', padding: '6px 12px' },
        head: { backgroundColor: '#0d1520', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.08em', color: '#8892A4', textTransform: 'uppercase' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: '0.72rem' } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#1E2A3A' } },
    },
  },
});

export default theme;
