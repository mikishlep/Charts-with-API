<script setup>
import { onMounted } from 'vue';
import { useApiData } from '../composables/useApiData.js';

const { 
  data: sales, 
  loading, 
  error, 
  page, 
  lastPage, 
  loadData, 
  changePage 
} = useApiData('/sales', { 
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