<template>
    <section>
        <router-link to="/list" class="btn" tag="button">
            <i class="fas fa-chevron-left"></i>
            <span>Back to List</span>
        </router-link>
        <h1>404 Country Not Found</h1>
    </section>
</template>

<style lang="scss" scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    .btn {
        position: absolute;
        top: 15px;
        left: 15px;
    }

    h1 {
        font-size: 100px;
        text-align: center;
    }
}
</style>
