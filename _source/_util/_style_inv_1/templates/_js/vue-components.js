//  VUE COMPONENETS
//

import Vue from 'vue';
import * as g from 'global';

// VARIABLES
let vueData = {};
let vueMethods = {};
window.VueEvent = new Vue();

// COMPONENTS
<% if (styleTemplateConfig.sections.vue.modules.accordion) { %>// Accordion
Vue.component('accordion', {
    data() {
        return { tabs: [] };
    },
    created() {
        this.tabs = this.$children;

        VueEvent.$on('tab-selected', (tab) => this.selectTab(tab));
    },
    methods: {
        selectTab(selectedTabTitle) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.title === selectedTabTitle);
            });
        }
    },
    template: `
    <div class="vue_accordion">
        <slot></slot>
    </div>
    `,
});
Vue.component('accordion-tab', {
    data() {
        return { isActive: false };
    },
    mounted() {
        this.isActive = this.selected;
    },
    props: {
        title: {},
        selected: { default: false },
    },
    methods: {
        onTabSelected() {
            if (!this.isActive) {
                VueEvent.$emit('tab-selected', this.title);
                g.gaTrack('accordion', 'clicked', this.title);
            } else {
                this.isActive = false;
            }
        }
    },
    template: `
    <div class="tab">
        <div class="title" :class="{ active:isActive }" @click="onTabSelected">{{ title }}</div>
        <div class="content" :class="{ active:isActive }"><div class="inner"><slot></slot></div></div>
    </div>
    `,
});<% } %>

<% if (styleTemplateConfig.sections.vue.modules.detect_scroll) { %>// Detect Scroll
vueData['scrollY'] = false;
vueMethods['scrollHandler'] = function() {
    this.scrollY = window.scrollY;
};<% } %>

<% if (styleTemplateConfig.sections.vue.modules.mobile_nav_toggle) { %>// Mobile Navigation Toggle
vueData['mobileNavActive'] = false;
vueMethods['showMobileNav'] = function() {
    this.mobileNavActive = !this.mobileNavActive;
};<% } %>

<% if (styleTemplateConfig.sections.vue.modules.overlay) { %>// Overlay
vueData['overlayIsVisible'] = false;
vueMethods['showOverlay'] = function(overlayTitle) {
    VueEvent.$emit('show-overlay', overlayTitle);
    this.overlayIsVisible = true;
    g.gaTrack('overlay', 'shown', overlayTitle);
};
Vue.component('overlay', {
    data() {
        return { isActive: false };
    },
    created() {
        VueEvent.$on('show-overlay', (id) => this.isActive = (id === this.overlayId));
    },
    mounted() {
        this.isActive = this.active;
    },
    props: {
        active: { default: false },
        overlayId: { type: String, required: true },
    },
    methods: {
        closeOverlay() {
            this.isActive = false;
            VueEvent.$emit('hide-overlay');
        }
    },
    template: `
    <div class="vue_overlay" v-show="isActive">
        <div class="mask" @click="closeOverlay"></div>
        <div class="content">
            <div class="inner" v-if="isActive">
                <slot></slot>
            </div>
            <div class="close icon_close" @click="closeOverlay">Close</div>
        </div>
    </div>
    `,
});<% } %>

// VUE INSTANCE
new Vue({
    el: '#page',
    data: vueData,
    created: function () {
        <% if (styleTemplateConfig.sections.vue.modules.detect_scroll) { %>// Hide overlay and remove content
        VueEvent.$on('hide-overlay', () => this.isActive = (this.overlayIsVisible = false));<% } %>

        <% if (styleTemplateConfig.sections.vue.modules.overlay) { %>// Watch scroll
        window.addEventListener('scroll', this.scrollHandler);<% } %>
    },
    methods: vueMethods,
    delimiters: ['${', '}'],
});


// INIT FUNCTIONS
if (jsDevMode) {
    console.log('Vue Components');
}