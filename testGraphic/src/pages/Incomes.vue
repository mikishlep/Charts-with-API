<script setup>
import { onMounted } from 'vue';
import { useApiData } from '../composables/useApiData.js';

const { 
  data: incomes, 
  loading, 
  error, 
  page, 
  lastPage, 
  loadData, 
  changePage 
} = useApiData('/incomes', { 
  withPagination: true,
  limit: 100,
  params: {
    dateTo: '2024-12-19'
  }
});

onMounted(() => {
  loadData();
});
</script>

<template>

</template>

<style scoped>

</style>