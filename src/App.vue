<template>
    <section id="app" class="main-app">
        <section class="main">
            <router-view :key="$route.fullPath" />
        </section>
    </section>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';
.main-app {
    height: 100vh;

    .main {
        height: calc(100% - 30px);
        overflow: hidden;
        padding: 15px;
        background-color: #121212;
        color: white;
    }
}
</style>
