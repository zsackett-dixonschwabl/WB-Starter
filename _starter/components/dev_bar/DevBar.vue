<template>
  <div class="c-dev_bar lg:flex lg:flex-row lg:justify-between w-full bg-black-60" :class="classes" v-if="isVisible">
    <div class="flex flex-row">
      <div class="flex flex-row items-center">
        <span class="p-3 text-white text-xs">Dev Mode: {{ devMode ? '⚙️ON' : '🚀OFF' }}</span>
        <span class="p-3 text-white text-xs">Links:</span>
        <Button class="p-3 text-white hover:text-black hover:bg-white transition-colors duration-500" unstyle href="/" label-text="🏠Home" />
        <Button class="p-3 text-white hover:text-black hover:bg-white transition-colors duration-500" unstyle href="/dev/docs/general/" label-text="📚Docs" />
        <Button class="p-3 text-white hover:text-black hover:bg-white transition-colors duration-500" unstyle v-bind="link" v-for="(link, index) in links" :key="index" />
      </div>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-row items-center" v-if="showColorSchemeToggles">
        <span class="p-3 text-white text-xs">Color Scheme:</span>
        <ColorSchemeToggle class="mx-2 focus:outline-none" remember scheme-id="default" title="Reset to default color scheme" v-if="showColorSchemeToggles">🚫</ColorSchemeToggle>
        <ColorSchemeToggle class="mx-2 focus:outline-none" remember :scheme-id="index" v-for="(label, index) in colorSchemes" :key="index">{{ label }}</ColorSchemeToggle>
      </div>
      <div class="p-3 flex flex-row items-center space-x-2">
        <span class="text-white text-xs">Display:</span>
        <span class="cursor-pointer" @click="toggleSticky" v-if="isSticky">❄️</span>
        <span class="cursor-pointer" @click="toggleSticky" v-else>🌊</span>
        <span class="cursor-pointer" @click="isVisible = false">❌</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { log } from 'JS/global.js';
  import wb from 'JS/automated/wb.js';
  import Button from 'Components/button/Button.vue';
  import ColorSchemeToggle from 'Components/color_scheme_toggle/ColorSchemeToggle.vue';

  // To add links:
  // :links="[{ href: 'https://tailwindcss.com', labelText: '🍃Tailwind CSS' }]"

  // To determine color schemes and labels
  // :color-schemes="{ dark: '🌑', light: '🌕', high-contrast: '🔲' }"

  export default {
    components: {
      Button,
      ColorSchemeToggle,
    },
    data() {
      return {
        devMode: wb.devMode,
        isSticky: false,
        isVisible: true,
        showDocsLink: wb.enableDocs,
        showColorSchemeToggles: false,
      }
    },
    props: {
      colorSchemes: { type: Object, default() { return { dark: '🌑', light: '🌕' } } },
      links: Array,
    },
    computed: {
      classes() {
        let classes = [];

        if (this.isSticky) {
          classes.push('fixed bottom-0 left-0');
        }

        return classes;
      },
    },
    methods: {
      toggleSticky() {
        this.isSticky = !this.isSticky;
        localStorage.setItem('devMode:sticky', this.isSticky);
      },
    },
    mounted() {
      log('WB Config', wb);

      if (Object.keys(wb.colors).length > 1) {
        this.showColorSchemeToggles = true;
      }

      this.isSticky = localStorage.getItem('devMode:sticky') ? localStorage.getItem('devMode:sticky') === 'true' : false;
    }
  }
</script>

<style lang="scss">
  .c-dev_bar {
    $self: &;

    backdrop-filter: blur(0.9rem);
  }
</style>