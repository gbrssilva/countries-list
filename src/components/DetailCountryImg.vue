<template>
    <section class="detail-country-img">
        <button class="btn" :class="{ selected: showFlag }" @click="showFlag = true">Flag</button>
        <button class="btn" :class="{ selected: !showFlag }" @click="showFlag = false">Coat Of Arms</button>
        <section class="detail-country-img-container">
            <img v-if="showFlag" :src="country.flags.svg" :alt="`${country.name.common} Flag`" />
            <img v-if="!showFlag" :src="country.coatOfArms.svg" :alt="`${country.name.common} Coat Of Arms`" />
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DetailCountryImg',
    props: ['country'],
    data: () => ({
        showFlag: true,
    }),
    computed: {},
    methods: {},
});
</script>

<style lang="scss">
.detail-country-img {
    .btn {
        width: 50%;
        margin: 0;
        transition: all 0.25s ease;

        &.selected {
            background: #828282;
        }
    }

    &-container {
        display: flex;
        padding: 5px;

        img {
            max-height: 300px;
            margin: 0 auto;
        }
    }
}
</style>
