import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { REF_COLOR, COMP_COLOR } from '../theme';

const TOOLTIP_STYLE = {
  backgroundColor: '#1a2332',
  border: '1px solid #2a3a4a',
  borderRadius: 6,
  fontSize: 12,
  fontFamily: "'Roboto Mono', monospace",
};

function ChartCard({ title, subtitle, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="overline" color="text.secondary">{title}</Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          {subtitle}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export function ResistivityChart({ data }) {
  return (
    <ChartCard
      title="저항율 트렌드 (MΩ·cm)"
      subtitle="REF vs COMP — 12개월 일평균 / 스펙 하한: 18.0 MΩ·cm"
    >
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8892A4' }} />
          <YAxis
            domain={[17.2, 18.6]}
            tick={{ fontSize: 11, fill: '#8892A4', fontFamily: "'Roboto Mono'" }}
            tickCount={8}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine y={18.0} stroke="#F44336" strokeDasharray="6 3"
            label={{ value: 'MIN 18.0', fill: '#F44336', fontSize: 10, position: 'insideBottomRight' }} />
          <Line type="monotone" dataKey="REF"  stroke={REF_COLOR}  strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="COMP" stroke={COMP_COLOR} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TocChart({ data }) {
  return (
    <ChartCard
      title="TOC 트렌드 (ppb)"
      subtitle="REF vs COMP — 12개월 일평균 / 스펙 상한: 1.0 ppb"
    >
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8892A4' }} />
          <YAxis
            domain={[0, 1.6]}
            tick={{ fontSize: 11, fill: '#8892A4', fontFamily: "'Roboto Mono'" }}
            tickCount={9}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine y={1.0} stroke="#F44336" strokeDasharray="6 3"
            label={{ value: 'MAX 1.0', fill: '#F44336', fontSize: 10, position: 'insideTopRight' }} />
          <Line type="monotone" dataKey="REF"  stroke={REF_COLOR}  strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="COMP" stroke={COMP_COLOR} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
