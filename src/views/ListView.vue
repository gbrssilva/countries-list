<template>
    <section class="country-list">
        <section class="country-list-view">
            <section class="header">
                <div class="input-group search">
                    <input type="text" v-model="search" placeholder="Search Country" />
                </div>
                <div class="input-group region">
                    <label>Filter by Region</label>
                    <list-region-selector @regionSelected="setRegion($event)"></list-region-selector>
                </div>
            </section>
            <section class="list">
                <list-entry
                    v-for="country of countriesByPageList[currentPage - 1]"
                    :key="country.cca2"
                    :country="country"></list-entry>
            </section>
            <section class="pagination">
                <list-size-selector @itemsPerPageChanges="setItemsPerPage($event)"></list-size-selector>
                <span :title="`Page ${currentPage} of $07{numberOfPages}`">
                    Page {{ currentPage }} of {{ numberOfPages }}
                </span>
                <button
                    class="btn"
                    title="Previous Page"
                    :class="{ disabled: currentPage === 1 }"
                    @click="currentPage !== 1 && (currentPage = currentPage - 1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button
                    class="btn"
                    title="Next Page"
                    :class="{ disabled: currentPage === numberOfPages }"
                    @click="currentPage !== numberOfPages && (currentPage = currentPage + 1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </section>
        </section>
    </section>
</template>

<script lang="ts">
import Axios from 'axios';
import { Vue } from 'vue-property-decorator';
import ListEntry from '@/components/ListEntry.vue';
import ListSizeSelector from '@/components/ListSizeSelector.vue';
import ListRegionSelector from '@/components/ListRegionSelector.vue';

export default Vue.extend({
    components: {
        ListEntry,
        ListSizeSelector,
        ListRegionSelector,
    },
    data() {
        return {
            search: '',
            selectedRegion: 'All',
            headers: [
                { text: 'Flag', value: 'flags', width: '100px' },
                {
                    text: 'Name',
                    value: 'name.common',
                },
                { text: 'Capital', value: 'capital' },
                { text: 'Region', value: 'region' },
                { text: 'Subregion', value: 'subregion' },
            ],
            countriesFullList: [],
            countriesFilteredList: [],
            countriesByPageList: [] as any,
            numberOfPages: 0,
            currentPage: 1,
            itemsByPage: 10,
            fieldsNeeded: 'cca2,flags,name,capital,region,subregion',
            searchCountryInterval: undefined as any,
        };
    },
    watch: {
        selectedRegion(val, oldVal) {
            if (val != oldVal) {
                if (val == 'All') {
                    this.getAllCountries();
                } else {
                    this.getCountriesByRegion();
                }
            }
        },
        search(val, oldVal) {
            if (val != oldVal) {
                this.searchCountry();
            }
        },
    },
    methods: {
        getAllCountries() {
            Axios.get(`https://restcountries.com/v3.1/all?fields=${this.fieldsNeeded}`).then((response: any) => {
                if (response.status == 200) {
                    this.countriesFullList = response.data;
                    this.filterList();
                }
            });
        },
        getCountriesByRegion() {
            Axios.get(`https://restcountries.com/v3.1/region/${this.selectedRegion}?fields=${this.fieldsNeeded}`).then(
                (response: any) => {
                    if (response.status == 200) {
                        this.countriesFullList = response.data;
                        this.filterList();
                    }
                }
            );
        },
        searchCountry() {
            clearTimeout(this.searchCountryInterval);
            this.searchCountryInterval = setTimeout(() => {
                this.filterList();
            }, 250);
        },
        filterList() {
            this.currentPage = 1;
            if (!this.search || !this.search.trim().length) {
                this.countriesFilteredList = this.countriesFullList;
            } else {
                this.countriesFilteredList = this.countriesFullList.filter((country: any) => {
                    let name = country.name.common.toLowerCase();
                    return name.indexOf(this.search.trim().toLowerCase()) != -1;
                });
            }
            this.listToPageList();
        },
        listToPageList() {
            let listByPage = [];
            if (this.countriesFilteredList && this.countriesFilteredList.length) {
                this.numberOfPages = Math.ceil(this.countriesFilteredList.length / this.itemsByPage);
                for (let i = 0; i < this.numberOfPages; i++) {
                    listByPage.push(
                        this.countriesFilteredList.slice(i * this.itemsByPage, i * this.itemsByPage + this.itemsByPage)
                    );
                }
            }
            this.countriesByPageList = listByPage;
        },
        setRegion(region: string) {
            if (region != this.selectedRegion) {
                this.selectedRegion = region;
                this.currentPage = 1;
                if (this.selectedRegion == 'All') {
                    this.getAllCountries();
                } else {
                    this.getCountriesByRegion();
                }
            }
        },
        setItemsPerPage(itemPerPage: number) {
            if (itemPerPage != this.itemsByPage) {
                this.itemsByPage = itemPerPage;
                this.currentPage = 1;
                this.listToPageList();
            }
        },
        goToDetails(country: any) {
            this.$router.push({ name: 'detail', params: { id: country.cca2 } });
        },
    },
    mounted() {
        this.getAllCountries();
    },
});
</script>

<style lang="scss" scoped>
.country-list {
    height: 100%;

    &-view {
        height: 100%;
        display: grid;
        grid-template:
            'header' auto
            'list' 1fr
            'pagination' 40px;

        .header {
            padding: 5px 0px;
            display: grid;
            grid-template-columns: 1fr 1fr;

            .input-group {
                margin: 0 25px;

                &.search {
                    input {
                        outline: none;
                        width: 100%;
                        height: 35px;
                        background: transparent;
                        border: none;
                        color: #ffffff;
                        border-bottom: 1px solid #ffffff;

                        &::placeholder {
                            color: #ffffff;
                        }
                    }
                }

                &.region {
                    .dropdown {
                        color: #ffffff;
                        border-bottom: 1px solid #ffffff;
                        margin-left: 15px;
                        height: 35px;
                    }
                }
            }
        }

        .list {
            padding: 5px;
            overflow: auto;
            color: #ffffff;
            text-align: center;
        }

        .pagination {
            padding: 5px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: flex-end;

            .dropdown {
                margin-right: 15px;
            }
        }
    }

    .btn-group {
        display: inline-flex;
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

        .btn {
            margin: 0px;
            border-radius: 0px;

            &:first-child {
                border-radius: 2px 0px 0px 2px;
            }
            &:last-child {
                border-radius: 0px 2px 2px 0px;
            }
        }
    }
}
</style>
