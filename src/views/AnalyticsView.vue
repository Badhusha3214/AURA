<template>
    <div class="min-h-screen bg-pink-50">
      <Navbar />
      <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold text-pink-600 mb-8 text-center">
          Tracking Period Analysis
        </h1>
        <div v-if="trackingPeriods.length === 0" class="text-pink-600 text-center">
          No tracking periods found.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="period in trackingPeriods"
            :key="period.id"
            class="bg-white rounded-lg shadow-md p-6 relative"
          >
            <h2 class="text-2xl font-semibold text-pink-600 mb-4">
              {{ period.name }}
            </h2>
            <div class="flex justify-between mb-6">
              <span class="text-gray-600">Start: {{ period.startDate }}</span>
              <span class="text-gray-600">End: {{ period.endDate }}</span>
            </div>
            <div class="h-48 relative mb-6">
              <div
                class="absolute inset-0 rounded-md overflow-hidden"
                :style="{
                  background: `url(${period.mapImage}) no-repeat center/cover`,
                }"
              ></div>
              <div
                class="bg-pink-500 h-full rounded-md"
                :style="{ width: `${calculateProgress(period.startDate, period.endDate)}%` }"
              ></div>
              <span
                class="absolute top-0 left-0 ml-2 mt-2 text-white font-semibold"
                >{{ calculateDuration(period.startDate, period.endDate) }}</span
              >
            </div>
            <p class="text-gray-600">{{ period.description }}</p>
          </div>
        </div>
        <div class="mt-12">
          <h2 class="text-2xl font-semibold text-pink-600 mb-4 text-center">
            Tips
          </h2>
          <ul class="list-disc pl-6 text-gray-600">
            <li>Track your habits consistently to get accurate data.</li>
            <li>Set realistic goals and celebrate small wins.</li>
            <li>Reflect on your progress and identify areas for improvement.</li>
            <li>Stay motivated by reminding yourself of your "why."</li>
            <li>Seek support from friends, family, or a community.</li>
          </ul>
        </div>
      </div>
    </div>
    <DashboardLayout />
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import DashboardLayout from '@/layouts/DashboardLayout.vue';

  
  export default {
    components: {
      Navbar,
      DashboardLayout
    },
    data() {
      return {
        trackingPeriods: [
          {
            id: 1,
            name: "Weight Loss Journey",
            startDate: "2023-03-01",
            endDate: "2023-04-15",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Embark on a healthier lifestyle by adopting a balanced diet and regular exercise routine.",
          },
          {
            id: 2,
            name: "Exercise Routine",
            startDate: "2023-02-15",
            endDate: "2023-05-01",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Strengthen your body and boost your energy levels through a consistent exercise program.",
          },
          {
            id: 3,
            name: "Meditation Journey",
            startDate: "2023-01-01",
            endDate: "2023-06-30",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Cultivate inner peace and mindfulness through regular meditation practice.",
          },
          {
            id: 4,
            name: "Language Learning",
            startDate: "2023-04-01",
            endDate: "2023-12-31",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Expand your horizons and unlock new opportunities by learning a new language.",
          },
          {
            id: 5,
            name: "Productivity Boost",
            startDate: "2023-05-15",
            endDate: "2023-08-31",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Increase your productivity and achieve more by implementing effective time management strategies.",
          },
          {
            id: 6,
            name: "Financial Literacy",
            startDate: "2023-07-01",
            endDate: "2024-03-31",
            mapImage: "https://via.placeholder.com/600x400?text=Map+Image",
            description:
              "Gain control over your finances and build a secure future through financial education.",
          },
        ],
      };
    },
    methods: {
      calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
      },
      calculateProgress(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        const totalDays = Math.ceil(
          Math.abs(end - start) / (1000 * 60 * 60 * 24)
        );
        const elapsedDays = Math.ceil(
          Math.abs(today - start) / (1000 * 60 * 60 * 24)
        );
        const progress = (elapsedDays / totalDays) * 100;
        return progress > 100 ? 100 : progress;
      },
    },
  };
  </script>