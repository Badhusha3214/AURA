<template>
  <div class="chart-container">
    <Line v-if="chartData.datasets.length > 0" :data="chartData" :options="chartOptions" />
    <div v-else class="flex justify-center items-center h-full">
      <p class="text-gray-500">No data available yet. Start tracking your periods to see analytics.</p>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'CycleChart',
  components: { Line },
  props: {
    periodData: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      // Ensure we have data to display
      if (!this.periodData || this.periodData.length === 0) {
        return {
          labels: [],
          datasets: []
        };
      }

      // Process the data for the chart
      const sortedData = [...this.periodData].sort((a, b) => {
        return new Date(`${a.month} ${a.year}`) - new Date(`${b.month} ${b.year}`);
      });

      return {
        labels: sortedData.map(d => `${d.month} ${d.year}`),
        datasets: [
          {
            label: 'Cycle Length',
            backgroundColor: 'rgba(244, 57, 118, 0.2)',
            borderColor: '#f43976',
            borderWidth: 2,
            data: sortedData.map(d => d.cycleLength),
            tension: 0.4,
            fill: true
          },
          {
            label: 'Period Duration',
            backgroundColor: 'rgba(255, 138, 176, 0.2)',
            borderColor: '#ff8ab0',
            borderWidth: 2,
            data: sortedData.map(d => d.periodLength),
            tension: 0.4,
            fill: true
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 40,
            ticks: {
              stepSize: 5
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#000',
            bodyColor: '#666',
            borderColor: '#f43976',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw} days`;
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      };
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 100%;
  min-height: 300px;
  position: relative;
}
</style>
