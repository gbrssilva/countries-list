<template>
    <section class="entry" @keyup.enter="goToDetails()" @click="goToDetails()" :title="country.name.common">
        <section class="entry-img">
            <img :src="country.flags.svg" :alt="`${country.name.common} Flag`" />
        </section>
        <section class="entry-title">
            {{ country.name.common }}
        </section>
        <section class="entry-additional">
            <span class="capital"><label>Capital</label>{{ capital }}</span>
            <span class="region"><label>Region</label>{{ country.region }}</span>
            <span class="subregion"><label>SubRegion</label>{{ country.subregion }}</span>
        </section>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ListEntry',
    props: ['country'],
    data: () => ({}),
    computed: {
        capital(): any {
            return this.country.capital && this.country.capital.length ? this.country.capital[0] : '-';
        },
    },
    methods: {
        goToDetails() {
            this.$router.push({ name: 'detail', params: { id: this.country.cca2 } });
        },
    },
});
</script>

<style lang="scss">
.entry {
    display: inline-block;
    width: calc(25% - 60px);
    min-width: 250px;
    height: 250px;
    margin: 5px;
    padding: 25px;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em, rgb(0 0 0 / 25%) 0px 0.125em 0.5em,
        rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
    transition: all 0.25s ease-in-out;

    &-img {
        height: 100px;
        img {
            height: 100px;
        }
    }

    &-title {
        padding: 15px 0;
        font-size: 22px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &-additional {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            'capital'
            'region'
            'subregion';

        span {
            display: flex;
            padding: 5px 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            label {
                font-weight: bold;
                margin-right: 15px;
            }
        }

        .capital {
            grid-area: capital;
        }
        .region {
            grid-area: region;
        }
        .subregion {
            grid-area: subregion;
        }
    }

    &:hover {
        background: #616161;
        color: white;
    }

    @media screen and (max-width: 680px) {
        width: calc(100% - 60px);

        .entry-additional {
            justify-items: center;
        }
    }
}
</style>
