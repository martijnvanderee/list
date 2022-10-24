import MlTruncateText from '@Components/MlTruncateText/MlTruncateText1.vue';
import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

describe('Vue component TruncateText', () => {
    // Arrange
    const dummyText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    it('Should render the component correctly', () => {
        const wrapper = shallowMount(MlTruncateText, {
            slots: {
                default: dummyText
            }
        });

        const truncate = wrapper.find('.truncate-text');

        // Assert
        expect(truncate.exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should remove eventlistener', () => {
        const wrapper = shallowMount(MlTruncateText, {
            slots: {
                default: dummyText
            }
        });

        const spy = vi.spyOn(wrapper.vm, 'getHeightOfText');
        // Act
        // const handleResume = vi.spyOn(wrapper.vm, 'onUnmounted');
        // const wrapper = shallowMount(MlTruncateText, {
        //     slots: {
        //         default: dummyText
        //     }
        // });

        const truncate = wrapper.find('.truncate-text');

        expect(truncate).toBeTruthy();

        console.log('truncate3', truncate.html());
        wrapper.unmount();
        expect(spy).toHaveBeenCalled();
    });

    // it('Should render a clickable truncate text with collapse', async () => {
    //     const wrapper = mount(MlTruncateText, {
    //         propsData: {
    //             variant: 'collapse',
    //             showButtonText: 'Lees meer',
    //             hideButtonText: 'Verberg'
    //         },
    //         slots: {
    //             default: dummyText
    //         }
    //     });

    //     const truncate = wrapper.find('.truncate-text');

    //     // Assert
    //     expect(truncate.exists()).toBe(true);
    //     // expect(wrapper.element).toMatchSnapshot();

    //     // Collapse still closed
    //     expect(truncate.classes()).toContain('collapsed');

    //     //wrapper.vm.data.showToggle = true;
    //     // await wrapper.setData({ showToggle: true });

    //     // await wrapper.vm.$nextTick();
    //     //expect(wrapper.vm.data.showToggle).toBe(true);

    //     // Check if collapsed toggle text is shown
    //     const showText = wrapper.find('.btn-link > span').text();
    //     expect(showText).toBe('Lees meer');
    //     expect(truncate.find('span').attributes().style).toBe('height: 52px;');

    //     // Simulate click to open collapse
    //     // await truncate.find('.btn-link').trigger('click');

    //     const button = truncate.find('.btn');

    //     await button.trigger('click');
    //     await wrapper.vm.$nextTick();

    //     const button1 = truncate.find('.btn');

    //     console.log(button);

    //     //expect(truncate.classes()).not.toContain('collapsed');

    //     // Check if collapsed toggle text has changed and collapsed class is removed
    //     // const hideText = wrapper.find('button');
    //     // Collapse still closed

    //     // expect(showText).toBe('Verberg');
    //     // expect(truncate.classes()).not.toContain('collapsed');
    // });

    // it('Should render a clickable truncate html in the default slot with collapse', async () => {
    //     const wrapper = mount(MlTruncateText, {
    //         propsData: {
    //             variant: 'collapse',
    //             showButtonText: 'Lees meer',
    //             hideButtonText: 'Verberg'
    //         },
    //         slots: {
    //             default: '<a href="#">Hello world!</a>'
    //         }
    //     });

    //     const truncate = wrapper.find('.truncate-text');

    //     // Assert
    //     expect(truncate.exists()).toBe(true);
    //     expect(wrapper.element).toMatchSnapshot();

    //     // Collapse still closed
    //     expect(truncate.classes()).toContain('collapsed');

    //     // Manually set visibility of toggle and height of truncated text
    //     // needed to simulate click
    //     await wrapper.setData({ showToggle: true });
    //     await wrapper.setData({ height: '52px' });

    //     // Check if collapsed toggle text is shown
    //     const showText = wrapper.find('.btn-link > span').text();
    //     expect(showText).toBe('Lees meer');
    //     expect(truncate.find('span').attributes().style).toBe('height: 52px;');

    //     // Simulate click to open collapse
    //     await truncate.find('.btn-link').trigger('click');

    //     // Check if collapsed toggle text has changed and collapsed class is removed
    //     const hideText = wrapper.find('.btn-link > span').text();
    //     expect(hideText).toBe('Verberg');
    //     expect(truncate.classes()).not.toContain('collapsed');

    //     //Check if the example renders the html correctly.
    //     const links = wrapper.findAll('a');
    //     expect(links).toHaveLength(1);
    //     expect(links.at(0).attributes('href')).toBe('#');
    // });
});
