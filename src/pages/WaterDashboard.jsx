import React from 'react';
import {
  Box, Grid, Typography, Chip, AppBar, Toolbar, Divider,
} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import KpiCard from '../components/KpiCard';
import { ResistivityChart, TocChart } from '../components/WaterQualityChart';
import ContaminationChart from '../components/ContaminationChart';
import AlarmPanel from '../components/AlarmPanel';
import LotTraceTable from '../components/LotTraceTable';
import {
  KPI, lots, alerts,
  resistivityTrend, tocTrend, contaminationByArea,
} from '../data/mockData';
import { REF_COLOR, COMP_COLOR } from '../theme';

const NOW = '2026-04-20 11:30';

export default function WaterDashboard() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* ── 상단 헤더 ── */}
      <AppBar position="static" elevation={0}
        sx={{ bgcolor: '#0d1520', borderBottom: '1px solid #1E2A3A' }}>
        <Toolbar sx={{ minHeight: 52, gap: 2 }}>
          <WaterDropIcon sx={{ color: '#29B6F6', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#E8EAF0' }}>
            반도체 공정수 Lot 추적 대시보드
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>
            Ultra-Pure Water Quality &amp; Lot Traceability
          </Typography>

          {/* 라인 범례 */}
          <Box display="flex" gap={1} alignItems="center">
            <Box display="flex" alignItems="center" gap={0.6}>
              <Box sx={{ width: 24, height: 3, bgcolor: REF_COLOR, borderRadius: 2 }} />
              <Chip label="REF 라인" size="small"
                sx={{ bgcolor: 'rgba(66,165,245,0.15)', color: REF_COLOR,
                      fontWeight: 700, fontSize: '0.72rem', height: 22 }} />
            </Box>
            <Box display="flex" alignItems="center" gap={0.6}>
              <Box sx={{ width: 24, height: 3, bgcolor: COMP_COLOR, borderRadius: 2,
                         backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent 4px,#0d1520 4px,#0d1520 7px)' }} />
              <Chip label="COMP 라인" size="small"
                sx={{ bgcolor: 'rgba(255,167,38,0.15)', color: COMP_COLOR,
                      fontWeight: 700, fontSize: '0.72rem', height: 22 }} />
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Typography variant="caption" sx={{ fontFamily: "'Roboto Mono'", color: '#8892A4' }}>
            {NOW}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
        {/* ── 섹션 라벨 ── */}
        <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          ▸ KPI 비교 요약 — REF vs COMP
        </Typography>

        {/* ── Row 1: KPI 카드 4개 ── */}
        <Grid container spacing={2} mb={2.5}>
          {Object.values(KPI).map((kpi) => (
            <Grid item xs={12} sm={6} lg={3} key={kpi.label}>
              <KpiCard kpi={kpi} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          ▸ 수질 트렌드 분석 — REF vs COMP (12개월)
        </Typography>

        {/* ── Row 2: 차트 3개 + 알람 패널 ── */}
        <Grid container spacing={2} mb={2.5}>
          <Grid item xs={12} md={4}>
            <ResistivityChart data={resistivityTrend} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TocChart data={tocTrend} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContaminationChart data={contaminationByArea} />
          </Grid>
        </Grid>

        <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          ▸ Lot 추적 로그 &amp; 알람
        </Typography>

        {/* ── Row 3: Lot 테이블 + 알람 패널 ── */}
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <LotTraceTable lots={lots} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <AlarmPanel alerts={alerts} />
          </Grid>
        </Grid>

        {/* ── 스펙 범례 ── */}
        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          {[
            { label: '저항 ≥ 18.0 MΩ·cm', color: '#4CAF50' },
            { label: 'TOC ≤ 1.0 ppb',      color: '#4CAF50' },
            { label: '입자수 ≤ 5 /mL',     color: '#4CAF50' },
            { label: '스펙 초과 → 적색 강조', color: '#F44336' },
          ].map(s => (
            <Box key={s.label} display="flex" alignItems="center" gap={0.5}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: s.color }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
