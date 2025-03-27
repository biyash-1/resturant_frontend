<template>
    <div>
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Chart from 'primevue/chart';
  
  const chartData = ref({
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40, 30, 70, 90, 100, 120],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4
      }
    ]
  });
  
  const chartOptions = ref({
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  