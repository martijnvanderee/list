<script setup lang="ts">
export type ItemsProp = {
    name: string;
    url: string;
};

export interface Props {
    /**
     * @example ['option 1', 'option 2']
     * @example [{ name: 'option1', url:'https://achmea.nl'}, { name: 'option1', url:'https://achmea.nl'}]
     */
    items: string[] | ItemsProp[];
    /**
     * @example "default": bullet points
     * @example "no-style": removal of any bullet formatting styling (text-like)
     * @example "icons": Only possible in combination with the icon="" prop. I.e. icon="document"
     */
    variant?: 'default' | 'no-style' | 'icons';
    icon?: 'checkbox' | 'document';
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
});

const listClass = () => (props.variant === 'no-style' ? 'list--nostyle' : '');
const listItemClass = () =>
    props.variant === 'icons' ? 'list__item list__item--icon icon-bg' : '';

const iconClass = () => {
    if (props.icon === 'checkbox') return 'icon-bg--ok';
    if (props.icon === 'document') return 'icon-bg--file--brand-01';
    return '';
};
</script>

<template>
    <ul :class="listClass()">
        <li
            v-for="(item, i) in items"
            :key="`li-${i}`"
            :class="[listItemClass(), iconClass()]"
        >
            <a
                v-if="typeof item !== 'string'"
                class="list__link"
                :class="{ 'link--icon': Boolean(icon) }"
                :href="item.url"
            >
                {{ item.name }}
            </a>
            <template v-else>
                {{ item }}
            </template>
        </li>
    </ul>
</template>
