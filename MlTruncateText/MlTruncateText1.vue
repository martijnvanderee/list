<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, reactive } from 'vue';
import MlButton from '@Components/MlButton/MlButton.vue';

export type Props = {
    id: string;
    showButtonText?: string;
    hideButtonText?: string;
    /**
     * Available variants: `collapse`
     */
    variant?: string;
    lines?: number;
};

const props = withDefaults(defineProps<Props>(), {
    id: '',
    showButtonText: 'Toon',
    hideButtonText: 'Verberg',
    variant: 'none',
    lines: 2
});

const collapse = ref<HTMLElement>();

const getHeightOfText = (lines: number) => {
    if (collapse.value) {
        const style = window
            .getComputedStyle(collapse.value)
            .getPropertyValue('font-size');
        const fontSize = parseFloat(style);

        const lineHeight = Math.floor(fontSize * 1.5);

        return `${Math.ceil(lines * lineHeight)}px`;
    }
    return `48px`;
};

const data = reactive({
    collapsed: true,
    showToggle: false,
    height: getHeightOfText(props.lines)
});

onMounted(() => {
    window.addEventListener('resize', displayToggleOnResize);
});
onUnmounted(() => {
    window.removeEventListener('resize', displayToggleOnResize);
});

const displayToggleOnResize = () => {
    if (collapse.value) {
        if (
            props.variant === 'collapse' &&
            data.collapsed &&
            collapse.value.scrollHeight > 48
        ) {
            data.height = getHeightOfText(props.lines);
            data.showToggle = true;
        } else {
            data.height = 'auto';
            data.showToggle = false;
        }
    }
};

const trackingId = computed(() =>
    data.collapsed ? `${props.id}-open` : `${props.id}-sluit`
);

const getModifierClass = () => {
    const modifierClasses = data.collapsed ? ['collapsed'] : [];

    switch (props.variant) {
        case 'collapse':
            modifierClasses.push('truncate-text--collapse');
            break;
    }

    return modifierClasses.join(' ');
};

const getNumberOfLinesOfText = () => {
    if (collapse.value) {
        const style = window
            .getComputedStyle(collapse.value)
            .getPropertyValue('font-size');
        const fontSize = parseFloat(style);

        const lineHeight = Math.floor(fontSize * 1.5);
        const height = collapse.value.scrollHeight;

        return Math.ceil(height / lineHeight);
    }
    return 0;
};

const toggleCollapsed = () => {
    toggleCollapse();

    if (collapse.value) {
        if (data.collapsed) {
            data.height = getHeightOfText(2);
        } else {
            data.height = getHeightOfText(getNumberOfLinesOfText());
        }
    }
};

const toggleCollapse = () => (data.collapsed = !data.collapsed);
</script>

<template>
    <div
        v-if="variant === 'collapse'"
        class="truncate-text"
        :class="getModifierClass()"
    >
        <span ref="collapse" :style="{ height: data.height }"><slot /></span>
        <MlButton
            :id="trackingId"
            variant="text"
            icon="sprite-arrow-up"
            icon-position="left"
            :button-text="data.collapsed ? showButtonText : hideButtonText"
            @click="toggleCollapsed"
        />
    </div>

    <span v-else class="truncate-text"> <slot /></span>
</template>
