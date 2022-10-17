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
     * HasOffset sets the offset class modifier of offset-md-3.
     * In case you set a different column size with columnClass, please use modifier instead of hasOffset
     */
    hasOffset?: boolean;
    /**
     * splitEqual when true, sets the column size of the dd element to col-6.
     */
    splitEqual?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    columnClass: '',
    modifier: '',
    hasOffset: false,
    splitEqual: false
});

const getClass = computed(() => {
    let ddClass = props.columnClass;
    if (!ddClass) {
        ddClass = props.splitEqual ? 'col-md-6' : 'col-md-8';
    }
    if (props.hasOffset) {
        ddClass = props.splitEqual
            ? `offset-md-6 ${ddClass}`
            : `offset-md-4 ${ddClass}`;
    }

    return props.modifier ? `${ddClass} ${props.modifier}` : ddClass;
});
</script>

<template>
    <dd :class="getClass">
        <slot></slot>
    </dd>
</template>
