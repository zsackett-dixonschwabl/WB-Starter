// import axios from 'axios';

const path = require('path');
const glob = require('glob-all');
const wb = require(`./wb.config.js`);

export default {
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    extractCSS: true,
    html: {
      minify: {
        minifyCSS: false,
        minifyJS: false,
      },
    },
    postcss: {
      plugins: {
        'postcss-simple-vars': {},
        'postcss-easy-import': {},
        'postcss-mixins': { mixins: require(`${path.resolve(wb.paths.css.src)}/_css.mixins.js`) },
        'postcss-functions': { functions: require(`${path.resolve(wb.paths.css.src)}/_css.functions.js`) },
        'postcss-nested': {},
        'postcss-custom-media': {
          importFrom: [
            () => {
              const customMedia = {};
              Object.entries(wb.mq).forEach(([key, value]) => {
                customMedia[`--mq-${key}`] = `(min-width: ${value}px)`;
              });

              return { customMedia };
            },
          ],
        },
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        autoprefixer: {},
      },
    },
    transpile: ['gsap'],
    extend(config, ctx) {
      config.resolve.alias.Components = path.resolve(wb.paths.components.src);
      config.resolve.alias.CSS = path.resolve(wb.paths.css.src);
      config.resolve.alias.GQL = path.resolve(`${wb.paths.starter.src}gql/`);
      config.resolve.alias.JS = path.resolve(wb.paths.js.src);
      config.resolve.alias.Layouts = path.resolve(`${wb.paths.starter.src}layouts/`);
      config.resolve.alias.Pages = path.resolve(`${wb.paths.starter.src}pages/`);
      config.resolve.alias.Source = path.resolve(wb.paths.starter.source);
      config.resolve.alias.Starter = path.resolve(wb.paths.starter.starter);
      config.resolve.alias.Templates = path.resolve(`${wb.paths.starter.src}templates/`);
    },
  },
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],
  components: [
    // '~/components/',
    { path: wb.paths.components.src, ignore: [`**/demo.vue`] }
  ],
  css: [`${path.resolve(wb.paths.css.src)}/app.css`],
  // generate: {
  //   fallback: true,
  //   routes() {
  //     return axios
  //       .post(
  //         process.env.CRAFT_API_URL,
  //         {
  //           query: `query {
  //   entries(limit: null) {
  //     uri
  //   }
  // }`,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.CRAFT_AUTH_TOKEN}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         return res.data.data.entries.map((entry) => {
  //           return entry.uri === '__home__' ? `/` : `/${entry.uri}`;
  //         });
  //       });
  //   },
  // },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  modules: [
    // '@nuxt/http',
    'nuxt-purgecss',
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'default',
        breakpoints: {
          ...wb.mq,
          lg: Infinity,
        },
      },
    ],
  ],
  pageTransition: 'page',
  plugins: [
    // '~/plugins/craft.js',
    // '~/plugins/preview.client.js'
  ],
  // privateRuntimeConfig: {
  //   craftApiUrl: process.env.CRAFT_API_URL,
  //   craftAuthToken: process.env.CRAFT_AUTH_TOKEN,
  // },
  // publicRuntimeConfig: {
  //   livePreview: process.env.LIVE_PREVIEW === 'true',
  //   craftApiUrl: process.env.LIVE_PREVIEW === 'true' ? process.env.CRAFT_API_URL : '',
  //   // craftApiUrl: process.env.CRAFT_API_URL,
  //   craftAuthToken: process.env.LIVE_PREVIEW === 'true' ? process.env.CRAFT_AUTH_TOKEN : '',
  // },
  purgeCSS: {
    enabled:
      process.env.NODE_ENV === 'production' && process.env.DEV_MODE !== 'true' && process.env.ENABLE_DOCS !== 'true'
        ? process.env.POSTCSS_PURGECSS === 'true' || false
        : false,
    paths: [
      `_source/_components/**/*.vue`,
      `pages/**/*.vue`,
      `components/**/*.vue`,
      ...(wb.enableDocs ? [`_starter/docs/**/*.vue`] : []),
    ],
    whitelist: ['body', 'html', 'img', 'a', 'nuxt-link', 'hidden'],
    whitelistPatterns: [/scheme/],
    whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
    extractors: [
      {
        extractor: (content) => {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        },
        extensions: ['vue', 'js', 'jsx', 'md', 'html', 'pug'],
      },
    ],
  },
  router: {
    extendRoutes(routes, resolve) {
      // Create style inventory pages
      if (wb.enableDocs) {
        const componentDocPages = glob.sync(`${wb.paths.components.src}**/demo.vue`);
        componentDocPages.forEach((item) => {
          const slug = path
            .dirname(item)
            .split(path.sep)
            .pop();
          routes.push({
            path: `/dev/docs/${slug}`,
            name: `component-docs-${slug}`,
            component: `${wb.paths.starter.starter}docs/vue/ComponentDocs.vue`,
            params: {
              slug,
            },
          });
        });
      }
    },
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        const element = document.querySelector(to.hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
          });
        }
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  },
  // styleResources: {
  //   scss: [
  //     path.resolve(`${wb.paths.css.src}automated/_colors.scss`),
  //     path.resolve(`${wb.paths.css.src}automated/_fonts.scss`),
  //     path.resolve(`${wb.paths.css.src}base/_functions.scss`),
  //     path.resolve(`${wb.paths.css.src}base/_variables.scss`),
  //     path.resolve(`${wb.paths.css.src}base/_mixins.scss`),
  //   ],
  // },
  target: 'static',
};
