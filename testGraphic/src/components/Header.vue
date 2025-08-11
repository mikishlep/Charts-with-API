<script setup>

</script>

<template>
    <header>
        <nav>
            <ul>
                <router-link to="/"><li>Продажи</li></router-link>
                <router-link to="/stocks"><li>Склады</li></router-link>
                <router-link to="/incomes"><li>Доходы</li></router-link>
                <router-link to="/orders"><li>Заказы</li></router-link>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #282828;
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    max-width: 100vw;
    margin: 0 auto;
    border-radius: 22px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

nav ul {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 15px;
}

li {
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
}
</style>