import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import { REF_COLOR, COMP_COLOR } from '../theme';

function delta(ref, comp, higherIsBetter) {
  const diff = ((ref - comp) / comp) * 100;
  const positive = higherIsBetter ? diff > 0 : diff < 0;
  return {
    text: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`,
    color: positive ? '#4CAF50' : '#F44336',
    label: positive ? 'REF 우위' : 'COMP 우위',
  };
}

export default function KpiCard({ kpi }) {
  const { label, unit, REF, COMP, higherIsBetter } = kpi;
  const d = delta(REF, COMP, higherIsBetter);
  const fmt = (v) => (typeof v === 'number' && v >= 1000 ? v.toLocaleString('ko-KR') : String(v));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="overline" color="text.secondary" display="block" mb={1}>
          {label}
        </Typography>

        <Box display="flex" alignItems="flex-end" gap={3}>
          {/* REF */}
          <Box>
            <Typography variant="caption" sx={{ color: REF_COLOR, fontWeight: 700, letterSpacing: 1 }}>
              REF
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: "'Roboto Mono', monospace", lineHeight: 1.1, color: REF_COLOR }}
            >
              {fmt(REF)}
            </Typography>
            {unit && (
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            )}
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

          {/* COMP */}
          <Box>
            <Typography variant="caption" sx={{ color: COMP_COLOR, fontWeight: 700, letterSpacing: 1 }}>
              COMP
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: "'Roboto Mono', monospace", lineHeight: 1.1, color: COMP_COLOR }}
            >
              {fmt(COMP)}
            </Typography>
            {unit && (
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            )}
          </Box>

          {/* Delta */}
          <Box ml="auto" textAlign="right">
            <Typography variant="caption" color="text.secondary" display="block">
              △ 차이
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "'Roboto Mono', monospace", fontWeight: 700, color: d.color }}
            >
              {d.text}
            </Typography>
            <Typography variant="caption" sx={{ color: d.color }}>
              {d.label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
