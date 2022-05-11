<template>
    <section class="detail-country-details" v-if="country">
        <div class="details-title">Details</div>
        <section class="details-wrapper">
            <section class="detail">
                <span class="detail-title">Capital -</span> {{ country.capital.join(', ') }}
            </section>
            <section class="detail">
                <span class="detail-title">Continent -</span> {{ country.continents.join(', ') }}
            </section>
            <section class="detail"><span class="detail-title">Region -</span> {{ country.region }}</section>
            <section class="detail"><span class="detail-title">Subregion -</span> {{ country.subregion }}</section>
            <section class="detail"><span class="detail-title">Population -</span> {{ country.population }}</section>
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DetailCountryDetails',
    props: ['country'],
    data: () => ({}),
});
</script>

<style lang="scss">
.detail-country-details {
    .details-title {
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

    .details-wrapper {
        display: flex;
        border-bottom: 1px solid hsla(0, 1%, 60%, 0.2);
        padding: 5px;
        display: flex;
        flex-wrap: wrap;

        .detail {
            background-color: #1f1f1f;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
            border-radius: 2px;
            text-transform: capitalize;
            padding: 5px;
            display: inline-block;
            margin: 2px;
            font-size: 16px;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            &-title {
                font-weight: bold;
                padding-right: 3px;
            }
        }
    }
}
</style>
