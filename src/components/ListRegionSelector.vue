<template>
    <section class="dropdown" :class="{ open: isOpen }" ref="dropdown">
        <span id="label" :title="placeholderText">
            {{ selectedRegion }}
            <button class="btn" title="Open Dropdown" aria-label="Open Dropdown" @click="isOpen = !isOpen">
                <i class="fas fa-chevron-down"></i>
            </button>
        </span>
        <div class="dropdown-content">
            <span
                v-for="region of regionsList"
                :key="region"
                tabindex="0"
                class="dropdown-item"
                @click="updateItemsPerPage(region)"
                @keyup.enter="updateItemsPerPage(region)">
                {{ region }}
            </span>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ListSizeSelector',
    data: () => ({
        isOpen: false,
        selectedRegion: 'All',
        regionsList: ['All', 'Americas', 'Africa', 'Oceania', 'Asia', 'Antarctic', 'Europe'],
    }),
    computed: {
        placeholderText(): any {
            let regionText = 'region';
            if (this.selectedRegion == 'All') {
                regionText = 'regions';
            }

            return `Showing countries from ${this.selectedRegion} ${regionText}`;
        },
    },
    methods: {
        updateItemsPerPage(region: string) {
            if (region != this.selectedRegion) {
                this.selectedRegion = region;
                this.$emit('regionSelected', this.selectedRegion);
                this.isOpen = false;
            }
        },
        closeDropdown(e: MouseEvent) {
            let targetElement: Node = e.target as Node;
            if (!(this.$refs.dropdown as any)?.contains(targetElement) && this.isOpen) {
                this.isOpen = false;
            }
        },
    },
    mounted() {
        this.$emit('regionSelected', this.selectedRegion);
        document.addEventListener('click', this.closeDropdown.bind(this));
    },
    destroyed() {
        document.removeEventListener('click', this.closeDropdown.bind(this));
    },
});
</script>
