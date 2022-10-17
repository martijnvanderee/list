import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import MlListDefinition from './MlListDefinition.vue';
import MlDt from './MlDt/MlDt.vue';
import MlDd from './MlDd/MlDd.vue';

describe('Vue component MlDefinitionList', () => {
    it('Should render the component correctly', () => {
        // Act
        const wrapper = shallowMount(MlListDefinition, {
            propsData: {
                id: 'test'
            }
        });

        // // Assert
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render modifier on dl correctly', () => {
        // Act
        const wrapper = shallowMount(MlListDefinition, {
            propsData: {
                id: 'test-2',
                modifier: 'mb-0'
            }
        });

        // Assert
        const list = wrapper.find('dl');
        expect(list.element.className).toBe('list--definition row mb-0');
    });

    it('Should render split equal on dl correctly', () => {
        const WrapperComponent = {
            template: `
                <MlListDefinition id="test" v-slot="splitEqual" :splitEqual="true">
                    <MlDt splitEqual>test</MlDt>
                    <MlDd splitEqual>test</MlDd>
                </MlListDefinition>
            `,
            components: {
                MlListDefinition,
                MlDt,
                MlDd
            }
        };
        // Act
        const wrapper = mount(WrapperComponent);

        // Assert
        const list = wrapper.find('dt');
        expect(list.element.className).toBe('col-md-6');

        const dd = wrapper.find('dd');
        expect(dd.element.className).toBe('col-md-6');
    });
});
