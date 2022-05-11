<template>
    <section class="detail-wrapper">
        <router-link to="/list" class="btn" tag="button">
            <i class="fas fa-chevron-left"></i>
            <span>Back to List</span>
        </router-link>
        <section class="country-card" v-if="countryDetail">
            <header :title="countryDetail.name.common">
                {{ countryDetail.name.common }}
            </header>
            <main>
                <detail-country-img :country="countryDetail"></detail-country-img>
                <detail-country-details :country="countryDetail"></detail-country-details>
                <detail-country-languages :languages="countryDetail.languages"></detail-country-languages>
                <detail-country-currencies :currencies="countryDetail.currencies"></detail-country-currencies>
                <detail-country-neighbour :borders="countryDetail.borders"></detail-country-neighbour>
            </main>
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from 'axios';
import DetailCountryImg from '@/components/DetailCountryImg.vue';
import DetailCountryDetails from '@/components/DetailCountryDetails.vue';
import DetailCountryNeighbour from '@/components/DetailCountryNeighbour.vue';
import DetailCountryLanguages from '@/components/DetailCountryLanguages.vue';
import DetailCountryCurrencies from '@/components/DetailCountryCurrencies.vue';

export default Vue.extend({
    components: {
        DetailCountryImg,
        DetailCountryDetails,
        DetailCountryNeighbour,
        DetailCountryLanguages,
        DetailCountryCurrencies,
    },
    data() {
        return {
            countryDetail: null as any,
            fields: 'name,flags,coatOfArms,cca2,capital,borders,currencies,languages,population,region,subregion,continents',
        };
    },
    methods: {
        getCountry() {
            Axios.get(`https://restcountries.com/v3.1/alpha/${this.$route.params.id}?fields=${this.fields}`).then(
                (response: any) => {
                    if (response.status == 200) {
                        this.countryDetail = response.data;
                    } else {
                        this.$router.push({ name: 'notFound' });
                    }
                },
                () => {
                    this.$router.push({ name: 'notFound' });
                }
            );
        },
    },
    mounted() {
        if (!this.$route.params.id) {
            this.$router.push({ name: 'list' });
        }
        this.getCountry();
    },
});
</script>

<style lang="scss" scoped>
.detail-wrapper {
    .country-card {
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        border: 1px solid hsla(0, 1%, 60%, 0.2);
        border-radius: 2px;
        max-width: 800px;
        margin: auto;

        height: 100%;
        display: grid;
        grid-template-rows: 40px 1fr;

        header {
            text-transform: capitalize;
            font-size: 26px;
            font-weight: bold;
            border-bottom: 1px solid hsla(0, 1%, 60%, 0.2);
            padding: 5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
        }

        main {
            width: 100%;
            display: grid;
        }
    }
}
</style>
