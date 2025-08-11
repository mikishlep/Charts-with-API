<script setup>
import { onMounted } from 'vue';
import { useApiData } from '../composables/useApiData.js';

const { 
  data: stocks, 
  loading, 
  error, 
  page, 
  lastPage, 
  loadData, 
  changePage 
} = useApiData('/stocks', { 
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