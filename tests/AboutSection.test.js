import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AboutSection from '../src/sections/AboutSection.vue';
import { cvData } from '../src/data/cvData.js';

describe('AboutSection', () => {
  it('renderiza nombre', () => {
    const wrapper = mount(AboutSection);
    expect(wrapper.text()).toContain(cvData.personal.name);
  });
});
