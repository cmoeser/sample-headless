/**
 *  Nuxt config
 *  Configuration paramaters for Nuxt build
 *  @author Chip Moeser 
 *
 *  Sat Mar 9 15:34:10 EST 2019
 */


const path = require('path')
const parseArgs = require('minimist')
const postcssFunctions = require('postcss-functions')


const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port'
  },
  string: ['H'],
  unknown: parameter => false
})

const port = argv.port || process.env.PORT || process.env.npm_package_config_nuxt_port || '3000'

const host = argv.hostname || process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  debug: true,
  srcDir: 'src/',
  head: {
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      },
      {
        hid: 'msvalidate.01',
        name: 'msvalidate.01',
        content: '123'
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: '123'
      },
      {
        hid: 'HandheldFriendly',
        name: 'HandheldFriendly',
        content: 'true'
      },
      {
        hid: 'MobileOptimized',
        name: 'MobileOptimized',
        content: 'width'
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#071e2c'
      },
      {
        name: 'referrer',
        content: 'always'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Sample'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Sample'
      }
    ],
    // link: [{ rel: 'stylesheet', href: 'https://use.typekit.net/mug6sdz.css' }],

    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=Symbol%2CPromise%2CSymbol.toStringTag'
      }
    ]
  },

  manifest: {
    name: 'Sample: An Integrated Brand Engagement Engine',
    short_name: 'Sample',
    background_color: '#081f2d',
    description:
      "Sample, an integrated brand engagement engine, works with clients across multiple industries to meet and exceed their marketing goals. We're the marketing agency you want by your side."
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  css: ['~/assets/css/styles.css'],
  plugins: [
    {
      src: '~/plugins/app'
    }

  ],
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-fullpage.js'],
  robots: {
    UserAgent: '*',
    Disallow: ['/']
  },
  icon: {
    targetDir: '/',
    iconSrc: 'src/static/icon.png',
    sizes: [16, 29, 40, 50, 57, 58, 60, 72, 76, 80, 87, 100, 120, 114, 120, 144, 152, 167, 180, 192, 384, 512]
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.yourSample.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
    routes: [
      '/portfolio',
      '/portfolio/bf-goodrich',
      '/portfolio/north-country-school',
      '/portfolio/brewery-ommegang',
      '/portfolio/north-country-savings-bank',
      'contact',
      '/contact/lake-placid',
      '/contact/saratoga'
    ],
    exclude: [
      '/services/strategic-consulting',
      '/services/branding-messaging'
    ]
  },
  // Give apollo module options
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://brain.yourSample.com/graphql/'
      }
    }
  },
  modern: 'server',
  /*
   ** Build configuration
   */
  buildDir: 'dist/server/nuxt',
  build: {
    // transpile: ['./node_modules/node-fetch'],
    publicPath: '/assets/',
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : { ie: '11' }
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      }
    },
    cssSourceMap: true,
    optimizeCSS: false,
    postcss: {
      plugins: {
        'postcss-custom-media': {},
        'postcss-media-minmax': {},
        'postcss-import': {},
        'postcss-apply': {},
        'postcss-mixins': {},
        'postcss-nested': {},
        'postcss-discard-comments': {},
        'postcss-clean': {},
        'postcss-preset-env': {},
        'autoprefixer': {},
        'cssnano': {}
      },
      order: [
        'postcss-custom-media',
        'postcss-media-minmax',
        'postcss-import',
        'postcss-apply',
        'postcss-mixins',
        'postcss-nested',
        'postcss-discard-comments',
        'postcss-preset-env',
        'autoprefixer',
        'cssnano'
      ],

      preset: {
        stage: 0,
        autoprefixer: {
          flexbox: true
        }
      }
      /*
      postcssFunctions: {  
        functions: {
          glob: path.join(__dirname, '/assets/css/functions', '*.js')
        }
      }*/
    }

    /*
     ** You can extend webpack config here
     */

    /*
    extend(config, { isServer }) {
      console.log('TRANSPILE')
      config.module.rules.push({
        test: /\.js$/,
        include: [path.join(__dirname, '/node_modules/node-fetch')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      })
    }
    */

    /*
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
    */
  }
}
