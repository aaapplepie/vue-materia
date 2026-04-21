import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { REF_COLOR, COMP_COLOR } from '../theme';

const TOOLTIP_STYLE = {
  backgroundColor: '#1a2332',
  border: '1px solid #2a3a4a',
  borderRadius: 6,
  fontSize: 12,
  fontFamily: "'Roboto Mono', monospace",
};

export default function ContaminationChart({ data }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="overline" color="text.secondary">
          공정 구역별 오염 이벤트
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          REF vs COMP — 당월 누적 / 단위: 건
        </Typography>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" />
            <XAxis dataKey="area" tick={{ fontSize: 11, fill: '#8892A4' }} />
            <YAxis tick={{ fontSize: 11, fill: '#8892A4', fontFamily: "'Roboto Mono'" }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="REF"  fill={REF_COLOR}  radius={[3, 3, 0, 0]} maxBarSize={20} />
            <Bar dataKey="COMP" fill={COMP_COLOR} radius={[3, 3, 0, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
