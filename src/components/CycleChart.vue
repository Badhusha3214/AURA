<template>
  <div class="cycle-chart-container">
    <canvas ref="cycleChart"></canvas>
    <div v-if="periodData.length === 0" class="empty-state flex items-center justify-center h-full">
      <p class="text-gray-500">No cycle data available to display</p>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'CycleChart',
  props: {
    periodData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.periodData.length === 0) return;
      
      const ctx = this.$refs.cycleChart.getContext('2d');
      
      // Prepare data for chart
      const labels = this.periodData.map(period => 
        `${period.month.substring(0, 3)} ${period.year}`
      );
      
      const cycleData = this.periodData.map(period => period.cycleLength);
      const durationData = this.periodData.map(period => period.duration);
      
      // Destroy existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }
      
      // Create new chart
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cycle Length (days)',
              data: cycleData,
              backgroundColor: 'rgba(244, 110, 152, 0.6)',
              borderColor: 'rgba(244, 110, 152, 1)',
              borderWidth: 1,
              barPercentage: 0.6
            },
            {
              label: 'Period Duration (days)',
              data: durationData,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              barPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                stepSize: 7
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: function(tooltipItems) {
                  const index = tooltipItems[0].dataIndex;
                  const period = this.periodData[index];
                  return `${period.month} ${period.year}`;
                }.bind(this),
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + ' days';
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }
  },
  watch: {
    periodData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.renderChart();
        });
      }
    }
  }
}
</script>

<style scoped>
.cycle-chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.empty-state {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
