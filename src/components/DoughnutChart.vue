<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import axiosInstance from '../axios.js';

const topProducts = ref([]);
const chartData = ref({
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
});

// Chart options to configure legend position and responsiveness
const chartOptions = ref({
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right', // Positions the legend to the right
            labels: {
                padding: 10, // Adjusts the padding between legend items
                boxWidth: 20, // Adjusts the width of the color box
                font: {
                    size: 14 // Adjusts the font size of legend labels
                }
            }
        }
    },
    layout: {
        padding: {
            right: 20 // Adjusts the padding on the right side to reduce gap
        }
    }
});

const fetchTopProducts = async () => {
    try {
        const response = await axiosInstance.get('/api/order/top-products');
        const data = response.data;

        if (Array.isArray(data.topProducts)) {
            topProducts.value = data.topProducts;
            chartData.value = {
                labels: topProducts.value.map(product => product.title),
                datasets: [{
                    data: topProducts.value.map(product => product.count),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            };
        } else {
            console.error('Expected an array but received:', data.topProducts);
        }
    } catch (err) {
        console.error('Error fetching top products:', err);
    }
};

onMounted(() => {
    fetchTopProducts();
});
</script>
<template>
     <div class="chart-container">

        <Chart type="doughnut" :data="chartData" :options="chartOptions" />
    
    </div>
</template>


<style scoped>
.chart-container {
    width: 100%;
    max-width: 500px;
    height: 200px;
    margin: 0 auto;
}

.chart-wrapper {
    height: 100%;
    position: relative;
}

:deep(.p-chart) {
    height: 100% !important;
    width: 100% !important;
}
</style>
