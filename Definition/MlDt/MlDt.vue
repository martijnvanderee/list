<script setup lang="ts">
import { computed } from 'vue';
export interface Props {
    /**
     * columnClass sets the size of the column
     */
    columnClass?: string;
    /**
     * Modifier sets possible additional classes to the definition list
     */
    modifier?: string;
    /**
     * splitEqual when true, sets the column size of the dt element to col-6.
     */
    splitEqual?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    columnClass: '',
    modifier: '',
    splitEqual: false
});

const getClass = computed(() => {
    const columnClass = props.columnClass;

    const classList = columnClass
        ? columnClass
        : ifSplitEqual(props.splitEqual);

    return props.modifier ? `${classList} ${props.modifier}` : classList;
});

const ifSplitEqual = (splitEqual: boolean) =>
    splitEqual ? 'col-md-6' : 'col-md-4';
</script>

<template>
    <dt :class="getClass">
        <slot></slot>
    </dt>
</template>
