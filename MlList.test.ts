import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import MlList from './MlList.vue';

describe('Vue component MlList', () => {
    it('Should render the component correctly', () => {
        //Act
        const wrapper = shallowMount(MlList, {
            propsData: {
                items: ['option 1', 'option 2', 'option 3', 'option 4']
            }
        });

        // Assert
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render links', () => {
        //Act
        const wrapper = shallowMount(MlList, {
            propsData: {
                items: [
                    { name: 'link 1', url: 'https://www.achmea.nl' },
                    { name: 'link 2', url: 'https://www.ziezo.nl' }
                ]
            }
        });
        // Assert
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.findAll('a.list__link')).toHaveLength(2);
        expect(wrapper.find('a.list__link').attributes('href')).toBe(
            'https://www.achmea.nl'
        );
    });

    it('Should be possible to render a checkbox icon', () => {
        //Act
        const wrapper = mount(MlList, {
            propsData: {
                items: ['option 1', 'option 2'],
                variant: 'icons',
                icon: 'checkbox'
            }
        });
        // Assert
        expect(
            wrapper.findAll(
                'li.list__item.list__item--icon.icon-bg.icon-bg--ok'
            )
        ).toHaveLength(2);
    });
    it('Should be possible to render a document icon', () => {
        //Act
        const wrapper = shallowMount(MlList, {
            propsData: {
                items: ['option 1', 'option 2'],
                variant: 'icons',
                icon: 'document'
            }
        });
        // Assert
        expect(
            wrapper.findAll(
                'li.list__item.list__item--icon.icon-bg.icon-bg--file--brand-01'
            )
        ).toHaveLength(2);
    });
    it('Can render an unstyled list', () => {
        //Act
        const wrapper = mount(MlList, {
            propsData: {
                items: ['option 1', 'option 2'],
                variant: 'no-style'
            }
        });
        // Assert
        expect(wrapper.findAll('li.list__item')).toHaveLength(0);
        expect(wrapper.findAll('li')).toHaveLength(2);
    });
});
