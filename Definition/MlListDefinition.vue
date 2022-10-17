<script setup lang="ts">
export interface Props {
    id: string;
    modifier?: string;
}

withDefaults(defineProps<Props>(), {
    /**
     * Modifier sets possible additional classes to the definition list
     */
    modifier: ''
});
</script>

<template>
    <dl :id="id" class="list--definition row" :class="modifier">
        <slot />
    </dl>
</template>
