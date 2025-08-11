<script setup>
import { ref, watch, onMounted } from 'vue';
import { useApiData } from '../composables/useApiData.js';
import dayjs from 'dayjs';

const dateFrom = ref(dayjs().format('YYYY-MM-DD'));
const dateTo = ref(dayjs().format('YYYY-MM-DD'));

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
  limit: 100,
  dateFrom: () => dateFrom.value,
  dateTo: () => dateTo.value,
});

const updateData = () => {
  loadData();
};

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= lastPage.value) {
    changePage(newPage);
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
<div class="page-wrapper">
    <div class="controls-container">
        <div class="pagination-controls">
            <button @click="goToPage(1)" :disabled="page === 1">
                <img src="../assets/icons/top.svg" alt="Первая" style="rotate:-90deg;">
            </button>
            <button @click="goToPage(page - 1)" :disabled="page === 1">
                <img src="../assets/icons/up.svg" alt="Предыдущая" style="rotate:-90deg;">
            </button>
            <span>Страница {{ page }} из {{ lastPage }}</span>
            <button @click="goToPage(page + 1)" :disabled="page === lastPage">
                <img src="../assets/icons/down.svg" alt="Следующая" style="rotate:-90deg;">
            </button>
            <button @click="goToPage(lastPage)" :disabled="page === lastPage">
                <img src="../assets/icons/bottom.svg" alt="Последняя" style="rotate:-90deg;">
            </button>
        </div>

        <div class="date-controls">
            <div class="date-input">
                <label>Дата от:</label>
                <input 
                type="date" 
                v-model="dateFrom" 
                @change="updateData"
                />
            </div>
            <div class="date-input">
                <label>Дата до:</label>
                <input 
                type="date" 
                v-model="dateTo" 
                @change="updateData"
                />
            </div>
        </div>
    </div>

    <div class="data-display">
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>
      <div v-else>
        <p>Загружено записей: {{ sales.length }}</p>
        <p>Текущая страница: {{ page }} из {{ lastPage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
    padding: 20px;
    margin-top: 100px;
}

.controls-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 20px;
}

.date-controls {
    display: flex;
    gap: 20px;
    padding: 15px;
    flex-wrap: wrap;
}

.date-input {
    display: flex;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
}

.date-input label {
    font-weight: bold;
    color: #333;
}

.date-input input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 14px;
    font-size: 1rem;
}

.pagination-controls {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px;
    flex-wrap: wrap;
}

.pagination-controls button {
    padding: 0;
    color: #fff;
    cursor: pointer;
    border-radius: 14px;
    transition: all 0.2s;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    border: none;
    outline: none;
}

.pagination-controls button img {
    width: 20px;
    height: 20px;
    filter: invert(1);
}

.pagination-controls button:hover:not(:disabled) {
    transform: scale(1.1);
}

.pagination-controls button:disabled {
    cursor: not-allowed;
}

.pagination-controls span {
    font-weight: bold;
    margin: 0 15px;
    white-space: nowrap;
}

.data-display {
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
}

.loading, .error {
    text-align: center;
    padding: 20px;
    margin: 20px 0;
}

.error {
    color: red;
    background: #ffe6e6;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .stocks-page {
        padding: 15px;
        margin-top: 80px;
    }
    
    .controls-container {
        flex-direction: column;
        gap: 15px;
    }
    
    .pagination-controls {
        justify-content: center;
        gap: 8px;
        padding: 10px;
    }
    
    .pagination-controls button {
        width: 40px;
        height: 40px;
    }
    
    .pagination-controls button img {
        width: 18px;
        height: 18px;
    }
    
    .pagination-controls span {
        margin: 0 10px;
        font-size: 14px;
    }
    
    .date-controls {
        justify-content: center;
        gap: 15px;
        padding: 10px;
    }
    
    .date-input {
        flex-direction: column;
        gap: 5px;
        align-items: center;
    }
    
    .date-input input {
        font-size: 16px; /* Убирает зум на iOS */
    }
}

@media (max-width: 480px) {
    .stocks-page {
        padding: 10px;
        margin-top: 70px;
    }
    
    .pagination-controls {
        gap: 5px;
        padding: 8px;
    }
    
    .pagination-controls button {
        width: 36px;
        height: 36px;
    }
    
    .pagination-controls button img {
        width: 16px;
        height: 16px;
    }
    
    .pagination-controls span {
        font-size: 12px;
        margin: 0 8px;
    }
    
    .date-controls {
        gap: 10px;
    }
    
    .date-input input {
        padding: 6px;
        font-size: 14px;
    }
}
</style>