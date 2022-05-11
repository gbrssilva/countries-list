<template>
    <section class="dropdown dropdown-size-selector" :class="{ open: isOpen }" ref="dropdown">
        <span id="label" :title="`Showing Items per Page ${itemsByPage}`">
            Items per Page {{ itemsByPage }}
            <button class="btn" title="Open Dropdown" aria-label="Open Dropdown" @click="isOpen = !isOpen">
                <i class="fas fa-chevron-up"></i>
            </button>
        </span>
        <div class="dropdown-content">
            <span
                v-for="number of itemsByPageOptions"
                :key="number"
                tabindex="0"
                class="dropdown-item"
                :title="`Show ${number} Items per Page`"
                @click="updateItemsPerPage(number)"
                @keyup.enter="updateItemsPerPage(number)">
                {{ number }}
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
        itemsByPage: 10,
        itemsByPageOptions: [10, 20, 50, 100, 200],
    }),
    methods: {
        updateItemsPerPage(itemPerPage: number) {
            if (itemPerPage != this.itemsByPage) {
                this.itemsByPage = itemPerPage;
                this.$emit('itemsPerPageChanges', this.itemsByPage);
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
        this.$emit('itemsPerPageChanges', this.itemsByPage);
        document.addEventListener('click', this.closeDropdown.bind(this));
    },
    destroyed() {
        document.removeEventListener('click', this.closeDropdown.bind(this));
    },
});
</script>
<style lang="scss">
.dropdown-size-selector {
    .dropdown-content {
        transform: translate(0px, calc(-100% - 25px));
    }
}
</style>
