import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Chip, Tab, Tabs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { SPEC } from '../data/mockData';
import { REF_COLOR, COMP_COLOR } from '../theme';

const STATUS_STYLE = {
  'Pass':   { bgcolor: 'rgba(76,175,80,0.15)',   color: '#4CAF50' },
  'Fail':   { bgcolor: 'rgba(244,67,54,0.15)',   color: '#F44336' },
  '진행중': { bgcolor: 'rgba(66,165,245,0.15)',   color: '#42A5F5' },
};

const MONO = { fontFamily: "'Roboto Mono', monospace", fontSize: '0.78rem' };

function outOfSpec(field, value) {
  if (field === 'toc')         return value > SPEC.toc.max;
  if (field === 'resistivity') return value < SPEC.resistivity.min;
  if (field === 'particles')   return value > SPEC.particles.max;
  return false;
}

function NumCell({ field, value }) {
  const bad = outOfSpec(field, value);
  return (
    <TableCell align="center"
      sx={{ ...MONO, color: bad ? '#F44336' : '#E8EAF0',
            fontWeight: bad ? 700 : 400,
            bgcolor: bad ? 'rgba(244,67,54,0.08)' : 'transparent' }}
    >
      {value}
    </TableCell>
  );
}

export default function LotTraceTable({ lots }) {
  const [tab, setTab] = useState('전체');
  const filtered = tab === '전체' ? lots : lots.filter(l => l.line === tab);

  const refFail  = lots.filter(l => l.line === 'REF'  && l.status === 'Fail').length;
  const compFail = lots.filter(l => l.line === 'COMP' && l.status === 'Fail').length;

  return (
    <Card>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 0 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box>
            <Typography variant="overline" color="text.secondary">Lot 추적 로그</Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              공정수 수질 실측값 — 스펙 초과 셀 적색 표시
            </Typography>
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="caption" color="text.secondary">Fail</Typography>
            <Chip label={`REF ${refFail}`} size="small"
              sx={{ bgcolor: 'rgba(66,165,245,0.12)', color: REF_COLOR, fontWeight: 700, fontSize: '0.68rem' }} />
            <Chip label={`COMP ${compFail}`} size="small"
              sx={{ bgcolor: 'rgba(255,167,38,0.12)', color: COMP_COLOR, fontWeight: 700, fontSize: '0.68rem' }} />
          </Box>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ minHeight: 32, mb: 1,
            '& .MuiTab-root': { minHeight: 32, py: 0, fontSize: '0.75rem', fontWeight: 600 },
            '& .MuiTabs-indicator': { height: 2 },
          }}
        >
          <Tab label="전체" value="전체" />
          <Tab label="REF" value="REF" sx={{ color: REF_COLOR }} />
          <Tab label="COMP" value="COMP" sx={{ color: COMP_COLOR }} />
        </Tabs>

        <TableContainer sx={{ maxHeight: 380, overflowY: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {['라인','Lot ID','공정 단계','수종','TOC (ppb)','저항 (MΩ·cm)','입자수 (/mL)','상태','시각'].map(h => (
                  <TableCell key={h} align={['TOC (ppb)','저항 (MΩ·cm)','입자수 (/mL)'].includes(h) ? 'center' : 'left'}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(lot => (
                <TableRow
                  key={lot.id}
                  sx={{
                    borderLeft: `3px solid ${lot.line === 'REF' ? REF_COLOR : COMP_COLOR}`,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
                  }}
                >
                  <TableCell>
                    <Chip
                      label={lot.line}
                      size="small"
                      sx={{
                        height: 18, fontSize: '0.65rem', fontWeight: 700,
                        bgcolor: lot.line === 'REF' ? 'rgba(66,165,245,0.2)' : 'rgba(255,167,38,0.2)',
                        color:   lot.line === 'REF' ? REF_COLOR : COMP_COLOR,
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...MONO, fontSize: '0.75rem' }}>{lot.id}</TableCell>
                  <TableCell sx={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{lot.stage}</TableCell>
                  <TableCell>
                    <Chip label={lot.waterType} size="small"
                      sx={{ height: 18, fontSize: '0.65rem',
                            bgcolor: 'rgba(41,182,246,0.12)', color: '#29B6F6',
                            '& .MuiChip-label': { px: 0.8 } }} />
                  </TableCell>
                  <NumCell field="toc"         value={lot.toc} />
                  <NumCell field="resistivity" value={lot.resistivity} />
                  <NumCell field="particles"   value={lot.particles} />
                  <TableCell>
                    <Chip
                      label={lot.status}
                      size="small"
                      sx={{
                        height: 18, fontSize: '0.65rem', fontWeight: 700,
                        ...STATUS_STYLE[lot.status],
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...MONO, fontSize: '0.72rem', color: '#8892A4', whiteSpace: 'nowrap' }}>
                    {lot.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
