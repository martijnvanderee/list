import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import MlDt from './MlDt.vue';

describe('Vue component MlDt', () => {
    it('Should render the component correctly', () => {
        // Act
        const wrapper = shallowMount(MlDt, {
            propsData: {}
        });

        // Assert
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render modifier on dl correctly', () => {
        // Act
        const wrapper = shallowMount(MlDt, {
            propsData: {
                modifier: 'mb-0'
            }
        });

        // Assert
        const list = wrapper.find('dt');
        expect(list.element.className).toBe('col-md-4 mb-0');
    });
});
