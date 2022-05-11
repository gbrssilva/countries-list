<template>
    <section class="detail-country-neighbour" v-if="neighbours && neighbours.length">
        <div class="neighbour-title">Border countries</div>
        <section class="neighbour-wrapper">
            <router-link
                :to="`/detail/${country.cca2}`"
                class="neighbour"
                tag="section"
                v-for="country of neighbours"
                :key="country.cca2">
                {{ country.name.common }}
            </router-link>
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from 'axios';

export default Vue.extend({
    name: 'DetailCountryNeighbour',
    props: ['borders'],
    data: () => ({
        neighbours: [] as any,
    }),
    methods: {
        getCountry(cca2: any) {
            Axios.get(`https://restcountries.com/v3.1/alpha/${cca2}?fields=name,cca2`).then((response: any) => {
                if (response.status == 200) {
                    this.neighbours.push(response.data);
                }
            });
        },
    },
    created() {
        if (this.borders && this.borders.length) {
            this.borders.forEach((cca2: string) => {
                this.getCountry(cca2);
            });
        }
    },
});
</script>

<style lang="scss">
.detail-country-neighbour {
    .neighbour-title {
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

    .neighbour-wrapper {
        display: flex;
        border-bottom: 1px solid hsla(0, 1%, 60%, 0.2);
        padding: 5px;
        display: flex;
        flex-wrap: wrap;

        .neighbour {
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
            cursor: pointer;
            transition: all 0.25s ease;

            &:hover {
                background: #828282;
            }
        }
    }
}
</style>
