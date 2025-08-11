<script setup>
import { onMounted } from 'vue';
import { useApiData } from '../composables/useApiData.js';

const { 
  data: orders, 
  loading, 
  error, 
  page, 
  lastPage, 
  loadData, 
  changePage 
} = useApiData('/orders', { 
  withPagination: true,
  limit: 100 
});

onMounted(() => {
  loadData();
});
</script>

<template>

</template>

<style scoped>

</style>