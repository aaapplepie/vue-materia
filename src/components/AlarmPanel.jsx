import React from 'react';
import {
  Card, CardContent, Typography, Box, Chip, Divider,
} from '@mui/material';
import ErrorOutlineIcon     from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon     from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon     from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { REF_COLOR, COMP_COLOR } from '../theme';

const SEVERITY_MAP = {
  error:   { Icon: ErrorOutlineIcon,      color: '#F44336', bg: 'rgba(244,67,54,0.12)'   },
  warning: { Icon: WarningAmberIcon,      color: '#FFA726', bg: 'rgba(255,167,38,0.12)'  },
  info:    { Icon: InfoOutlinedIcon,      color: '#29B6F6', bg: 'rgba(41,182,246,0.10)'  },
  success: { Icon: CheckCircleOutlineIcon, color: '#4CAF50', bg: 'rgba(76,175,80,0.10)' },
};

export default function AlarmPanel({ alerts }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="overline" color="text.secondary">알람 / 이벤트</Typography>
          <Box display="flex" gap={0.5}>
            <Chip label={`COMP ${alerts.filter(a => a.line==='COMP').length}`} size="small"
              sx={{ bgcolor: 'rgba(255,167,38,0.15)', color: COMP_COLOR, fontWeight: 700, fontSize: '0.68rem' }} />
            <Chip label={`REF ${alerts.filter(a => a.line==='REF').length}`} size="small"
              sx={{ bgcolor: 'rgba(66,165,245,0.15)', color: REF_COLOR, fontWeight: 700, fontSize: '0.68rem' }} />
          </Box>
        </Box>

        <Box sx={{ overflowY: 'auto', maxHeight: 460 }}>
          {alerts.map((alert, i) => {
            const { Icon, color, bg } = SEVERITY_MAP[alert.severity];
            return (
              <React.Fragment key={i}>
                <Box display="flex" alignItems="flex-start" gap={1.2} py={1}>
                  <Box
                    sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <Icon sx={{ fontSize: 18, color }} />
                  </Box>
                  <Box flex={1} minWidth={0}>
                    <Box display="flex" alignItems="center" gap={0.8} mb={0.2}>
                      <Chip
                        label={alert.line}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          bgcolor: alert.line === 'REF'
                            ? 'rgba(66,165,245,0.2)' : 'rgba(255,167,38,0.2)',
                          color: alert.line === 'REF' ? REF_COLOR : COMP_COLOR,
                          '& .MuiChip-label': { px: 0.8 },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: '#E8EAF0', overflow: 'hidden',
                              textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {alert.title}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block"
                      sx={{ fontSize: '0.68rem', lineHeight: 1.4 }}>
                      {alert.detail}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#566272' }}>
                      {alert.time}
                    </Typography>
                  </Box>
                </Box>
                {i < alerts.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
