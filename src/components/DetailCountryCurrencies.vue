<template>
    <section class="detail-country-currencies" v-if="currencies">
        <div class="currencies-title">Currencies</div>
        <section class="currencies-wrapper">
            <section class="currencie" v-for="currencie of currencies" :key="currencie.name">
                {{ currencie.name }} {{ currencie.symbol }}
            </section>
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DetailCountryCurrencies',
    props: ['currencies'],
    data: () => ({}),
});
</script>

<style lang="scss">
.detail-country-currencies {
    .currencies-title {
        text-transform: capitalize;
        font-size: 20px;
        font-weight: bold;
        border-bottom: 1px solid hsla(0, 1%, 60%, 0.2);
        border-top: 1px solid hsla(0, 1%, 60%, 0.2);
        padding: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    .currencies-wrapper {
        display: flex;
        border-bottom: 1px solid hsla(0, 1%, 60%, 0.2);
        padding: 5px;
        display: flex;
        flex-wrap: wrap;

        .currencie {
            background-color: #1f1f1f;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
            border-radius: 2px;
            text-transform: capitalize;
            padding: 5px;
            display: inline-block;
            margin: 2px;
            font-size: 16px;
            font-weight: bold;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
