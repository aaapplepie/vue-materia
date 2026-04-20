<template>
  <div class="py-4 container-fluid">
    <!-- Page Header -->
    <div class="row mb-2">
      <div class="col-12">
        <h5 class="mb-0 font-weight-bolder">
          <i class="material-icons-round text-info me-2" style="vertical-align: middle">water</i>
          Semiconductor Trace Water Lot Dashboard
        </h5>
        <p class="text-sm text-secondary mb-0">
          Ultra-pure water (UPW) quality monitoring &amp; lot traceability
        </p>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Lots Processed', value: '1,284' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+12%</span> vs last month"
              :icon="{ name: 'inventory_2', color: 'text-white', background: 'info' }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Avg. Resistivity (MΩ·cm)', value: '18.2' }"
              detail="<span class='text-success text-sm font-weight-bolder'>Spec: ≥18.0</span> — In range"
              :icon="{ name: 'electric_bolt', color: 'text-white', background: 'success' }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Contamination Events', value: '7' }"
              detail="<span class='text-danger text-sm font-weight-bolder'>+3</span> since last week"
              :icon="{ name: 'warning_amber', color: 'text-white', background: 'warning' }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'UPW Consumption (L/day)', value: '45,230' }"
              detail="<span class='text-success text-sm font-weight-bolder'>-2%</span> efficiency gain"
              :icon="{ name: 'water_drop', color: 'text-white', background: 'primary' }"
            />
          </div>
        </div>

        <!-- Charts Row -->
        <div class="row mt-4">
          <div class="col-lg-5 col-md-6 mt-4">
            <chart-holder-card
              title="UPW Resistivity Trend"
              subtitle="<span class='font-weight-bolder'>MΩ·cm</span> — daily average over 12 months"
              update="updated 1 hour ago"
              color="info"
            >
              <reports-line-chart
                id="resistivity-chart"
                :chart="{
                  labels: ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'],
                  datasets: { label: 'Resistivity (MΩ·cm)', data: [17.8, 18.0, 18.1, 17.9, 18.2, 18.3, 18.1, 18.0, 18.2, 18.1, 18.3, 18.2] },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Contamination by Process Area"
              subtitle="Particle / TOC events per area — current month"
              update="updated 30 min ago"
              color="warning"
            >
              <reports-bar-chart
                id="contamination-chart"
                :chart="{
                  labels: ['Etch', 'CMP', 'Clean', 'Rinse', 'Diff.', 'Photo'],
                  datasets: { label: 'Events', data: [3, 8, 2, 1, 5, 4] },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-3 mt-4">
            <chart-holder-card
              title="Lot Yield Rate"
              subtitle="(<span class='font-weight-bolder text-success'>96.2%</span>) avg pass rate"
              update="updated 15 min ago"
              color="success"
            >
              <reports-line-chart
                id="yield-chart"
                :chart="{
                  labels: ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'],
                  datasets: { label: 'Yield %', data: [94, 95, 96, 93, 97, 96, 95, 97, 96, 97, 96, 96] },
                }"
              />
            </chart-holder-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Lot Trace Table + Alert Timeline -->
    <div class="row">
      <!-- Lot Trace Table -->
      <div class="col-lg-8 col-md-12 mb-4">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="mb-0">Lot Trace Log</h6>
                <p class="text-sm text-secondary mb-0">
                  Real-time water quality per lot &amp; process stage
                </p>
              </div>
              <div>
                <span class="badge badge-sm bg-gradient-success me-1">{{ passCount }} Pass</span>
                <span class="badge badge-sm bg-gradient-danger me-1">{{ failCount }} Fail</span>
                <span class="badge badge-sm bg-gradient-info">{{ inProcessCount }} In Process</span>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Lot ID</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Process Stage</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Water Type</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">TOC (ppb)</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Resist. (MΩ·cm)</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Particles (/mL)</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Status</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="lot in lots" :key="lot.id">
                    <td class="ps-3">
                      <p class="text-xs font-weight-bold mb-0">{{ lot.id }}</p>
                    </td>
                    <td>
                      <p class="text-xs text-secondary mb-0">{{ lot.stage }}</p>
                    </td>
                    <td>
                      <span class="badge badge-sm" :class="waterTypeBadge(lot.waterType)">{{ lot.waterType }}</span>
                    </td>
                    <td class="text-center">
                      <p class="text-xs mb-0" :class="lot.toc > 1 ? 'text-danger font-weight-bold' : 'text-success'">
                        {{ lot.toc }}
                      </p>
                    </td>
                    <td class="text-center">
                      <p class="text-xs mb-0" :class="lot.resistivity < 18.0 ? 'text-danger font-weight-bold' : 'text-success'">
                        {{ lot.resistivity }}
                      </p>
                    </td>
                    <td class="text-center">
                      <p class="text-xs mb-0" :class="lot.particles > 5 ? 'text-danger font-weight-bold' : 'text-secondary'">
                        {{ lot.particles }}
                      </p>
                    </td>
                    <td class="text-center">
                      <span
                        class="badge badge-sm"
                        :class="{
                          'bg-gradient-success': lot.status === 'Pass',
                          'bg-gradient-danger': lot.status === 'Fail',
                          'bg-gradient-info': lot.status === 'In Process',
                        }"
                      >{{ lot.status }}</span>
                    </td>
                    <td>
                      <p class="text-xs text-secondary mb-0">{{ lot.timestamp }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert Timeline -->
      <div class="col-lg-4 col-md-12 mb-4">
        <div class="card h-100">
          <div class="card-header pb-0">
            <h6 class="mb-0">Contamination Alerts</h6>
            <p class="text-sm text-secondary mb-0">Recent quality exceedance events</p>
          </div>
          <div class="card-body p-3">
            <div
              v-for="(alert, index) in alerts"
              :key="index"
              class="d-flex mb-3"
            >
              <div
                class="icon icon-shape shadow text-center border-radius-md me-3 flex-shrink-0"
                :class="`bg-gradient-${alert.color} shadow-${alert.color}`"
                style="width:40px; height:40px; min-width:40px"
              >
                <i class="material-icons-round text-white" style="font-size:18px; line-height:40px">
                  {{ alert.icon }}
                </i>
              </div>
              <div>
                <p class="text-sm font-weight-bold mb-0">{{ alert.title }}</p>
                <p class="text-xs text-secondary mb-0">{{ alert.detail }}</p>
                <p class="text-xs text-secondary mb-0">{{ alert.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parameter Spec Reference -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <h6 class="mb-0">UPW Specification Reference</h6>
            <p class="text-sm text-secondary mb-0">Process water quality limits for semiconductor fab</p>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Parameter</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Unit</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">SEMI F57 Limit</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Current Avg.</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="spec in specs" :key="spec.parameter">
                    <td class="ps-3">
                      <p class="text-xs font-weight-bold mb-0">{{ spec.parameter }}</p>
                    </td>
                    <td class="text-center">
                      <p class="text-xs text-secondary mb-0">{{ spec.unit }}</p>
                    </td>
                    <td class="text-center">
                      <p class="text-xs mb-0">{{ spec.limit }}</p>
                    </td>
                    <td class="text-center">
                      <p class="text-xs font-weight-bold mb-0" :class="spec.inSpec ? 'text-success' : 'text-danger'">
                        {{ spec.current }}
                      </p>
                    </td>
                    <td class="text-center">
                      <span class="badge badge-sm" :class="spec.inSpec ? 'bg-gradient-success' : 'bg-gradient-danger'">
                        {{ spec.inSpec ? 'Conforming' : 'Out of Spec' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";

export default {
  name: "semiconductor-water-dashboard",
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
  },
  data() {
    return {
      lots: [
        { id: "LOT-2024-0451", stage: "Pre-Etch Rinse",   waterType: "UPW",   toc: 0.3, resistivity: 18.2, particles: 2,  status: "Pass",       timestamp: "2026-04-20 08:12" },
        { id: "LOT-2024-0452", stage: "CMP Post-Clean",   waterType: "UPW",   toc: 0.8, resistivity: 18.1, particles: 3,  status: "Pass",       timestamp: "2026-04-20 08:35" },
        { id: "LOT-2024-0453", stage: "Diffusion Rinse",  waterType: "DIW",   toc: 1.4, resistivity: 17.6, particles: 7,  status: "Fail",       timestamp: "2026-04-20 09:01" },
        { id: "LOT-2024-0454", stage: "Photo Pre-Soak",   waterType: "UPW",   toc: 0.2, resistivity: 18.3, particles: 1,  status: "Pass",       timestamp: "2026-04-20 09:18" },
        { id: "LOT-2024-0455", stage: "Wet Clean",        waterType: "UPW",   toc: 0.5, resistivity: 18.2, particles: 4,  status: "Pass",       timestamp: "2026-04-20 09:44" },
        { id: "LOT-2024-0456", stage: "Post-Etch Rinse",  waterType: "DIW",   toc: 2.1, resistivity: 17.4, particles: 11, status: "Fail",       timestamp: "2026-04-20 10:02" },
        { id: "LOT-2024-0457", stage: "CMP Slurry Rinse", waterType: "UPW",   toc: 0.4, resistivity: 18.1, particles: 3,  status: "Pass",       timestamp: "2026-04-20 10:21" },
        { id: "LOT-2024-0458", stage: "Spin Rinse Dry",   waterType: "UPW",   toc: 0.3, resistivity: 18.3, particles: 2,  status: "Pass",       timestamp: "2026-04-20 10:48" },
        { id: "LOT-2024-0459", stage: "Pre-Implant Clean", waterType: "UPW",  toc: 0.6, resistivity: 18.0, particles: 5,  status: "In Process", timestamp: "2026-04-20 11:05" },
        { id: "LOT-2024-0460", stage: "Oxide Growth Prep", waterType: "UPW",  toc: 0.4, resistivity: 18.2, particles: 2,  status: "In Process", timestamp: "2026-04-20 11:20" },
      ],
      alerts: [
        {
          color: "danger",
          icon: "error",
          title: "TOC Exceedance — LOT-2024-0456",
          detail: "TOC 2.1 ppb detected in Post-Etch Rinse (limit: 1.0 ppb)",
          time: "2026-04-20 10:02",
        },
        {
          color: "warning",
          icon: "warning_amber",
          title: "High Particle Count — LOT-2024-0453",
          detail: "7 particles/mL in Diffusion Rinse (limit: 5/mL)",
          time: "2026-04-20 09:01",
        },
        {
          color: "danger",
          icon: "electric_bolt",
          title: "Low Resistivity — LOT-2024-0453",
          detail: "Resistivity 17.6 MΩ·cm below spec (min: 18.0 MΩ·cm)",
          time: "2026-04-20 09:01",
        },
        {
          color: "info",
          icon: "info",
          title: "UPW Polisher Regeneration",
          detail: "Loop-3 ion exchange regeneration cycle started",
          time: "2026-04-20 07:30",
        },
        {
          color: "success",
          icon: "check_circle",
          title: "Filter Integrity Test Passed",
          detail: "0.2 µm POU filter — bubble point OK",
          time: "2026-04-20 06:00",
        },
        {
          color: "warning",
          icon: "science",
          title: "TOC Spike — Brief Recovery",
          detail: "TOC peaked at 1.8 ppb on Loop-2, resolved in 4 min",
          time: "2026-04-19 22:14",
        },
      ],
      specs: [
        { parameter: "Resistivity",        unit: "MΩ·cm",    limit: "≥ 18.0",    current: "18.2",  inSpec: true  },
        { parameter: "TOC",                unit: "ppb",       limit: "≤ 1.0",     current: "0.52",  inSpec: true  },
        { parameter: "Particles (≥0.05µm)",unit: "/mL",       limit: "≤ 5",       current: "3.4",   inSpec: true  },
        { parameter: "Bacteria",           unit: "CFU/mL",    limit: "≤ 0.001",   current: "0.0003",inSpec: true  },
        { parameter: "Silica (SiO₂)",      unit: "ppb",       limit: "≤ 0.5",     current: "0.3",   inSpec: true  },
        { parameter: "Dissolved O₂",       unit: "ppb",       limit: "≤ 100",     current: "8",     inSpec: true  },
        { parameter: "pH",                 unit: "—",         limit: "6.5 – 7.5", current: "6.9",   inSpec: true  },
        { parameter: "Na⁺ / Metal Ions",   unit: "ppt",       limit: "≤ 0.5",     current: "0.6",   inSpec: false },
      ],
    };
  },
  computed: {
    passCount() {
      return this.lots.filter((l) => l.status === "Pass").length;
    },
    failCount() {
      return this.lots.filter((l) => l.status === "Fail").length;
    },
    inProcessCount() {
      return this.lots.filter((l) => l.status === "In Process").length;
    },
  },
  methods: {
    waterTypeBadge(type) {
      return type === "UPW" ? "bg-gradient-info" : "bg-gradient-secondary";
    },
  },
};
</script>
