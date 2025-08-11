import { ref, onMounted } from 'vue';
import { fetchData } from '../services/api.js';
import dayjs from 'dayjs';

export function useApiData(endpoint, options = {}) {
    const data = ref([]);
    const loading = ref(false);
    const error = ref(null);
    
    const page = ref(1);
    const lastPage = ref(1);
  
    function getParams() {
      return {
        dateFrom: options.dateFrom || dayjs().format('YYYY-MM-DD'),
        ...(options.params || {}),
        ...(options.withPagination ? { page: page.value, limit: options.limit || 100 } : {})
      };
    }
  
    const loadData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const res = await fetchData(endpoint, getParams());
        data.value = res.data;
        if (options.withPagination && res.meta) {
          lastPage.value = res.meta.last_page;
        }
        console.log(`Данные ${endpoint}:`, res);
      } catch (err) {
        error.value = err;
        console.error(`Ошибка загрузки ${endpoint}:`, err);
      } finally {
        loading.value = false;
      }
    };
  
    function changePage(newPage) {
      if (newPage >= 1 && newPage <= lastPage.value) {
        page.value = newPage;
        loadData();
      }
    }
  
    if (options.withPagination) {
      return {
        data,
        loading,
        error,
        page,
        lastPage,
        loadData,
        changePage
      };
    } else {
      return {
        data,
        loading,
        error,
        loadData
      };
    }
}