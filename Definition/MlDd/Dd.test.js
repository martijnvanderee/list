import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import MlDd from './MlDd.vue';

describe('Vue component MlDd', () => {
    it('Should render the component correctly', () => {
        // Act
        const wrapper = shallowMount(MlDd, {
            propsData: {}
        });

        // Assert
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render modifier on dd correctly', () => {
        // Act
        const wrapper = shallowMount(MlDd, {
            propsData: {
                modifier: 'mb-0'
            }
        });

        // Assert
        const list = wrapper.find('dd');
        expect(list.element.className).toBe('col-md-8 mb-0');
    });

    it('Should render hasOffset on dd correctly', () => {
        // Act
        const wrapper = shallowMount(MlDd, {
            propsData: {
                hasOffset: true
            }
        });

        // Assert
        const list = wrapper.find('dd');
        expect(list.element.className).toBe('offset-md-4 col-md-8');
    });
});
