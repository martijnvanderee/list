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
};

const props = withDefaults(defineProps<Props>(), {
    id: '',
    showButtonText: 'Toon',
    hideButtonText: 'Verberg',
    variant: ''
});

const collapse = ref<HTMLElement>();

const data = reactive({ collapsed: true, showToggle: true, height: '52px' });

const trackingId = computed(() =>
    data.collapsed ? `${props.id}-open` : `${props.id}-sluit`
);

onMounted(() => {
    displayToggleOnResize();
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
            collapse.value.scrollHeight > 52
        ) {
            data.height = '52px';
            data.showToggle = true;
        } else {
            data.height = 'auto';
            data.showToggle = false;
        }
    }
};

const getModifierClass = () => {
    const modifierClasses = data.collapsed ? ['collapsed'] : [];

    switch (props.variant) {
        case 'collapse':
            modifierClasses.push('truncate-text--collapse');
            break;
    }
    return modifierClasses.join(' ');
};

const toggleCollapsed = () => {
    data.collapsed = !data.collapsed;

    if (collapse.value) {
        if (data.collapsed) {
            data.height = '52px';
        } else {
            data.height = `${collapse.value.scrollHeight}px`;
        }
    }
};
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
            v-if="data.showToggle"
        />
    </div>

    <span v-else class="truncate-text"> <slot /></span>
</template>
