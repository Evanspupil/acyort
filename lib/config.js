const yaml = require('yamljs')
const pathFn = require('path')
const urlFn = require('url')
const { strFormat } = require('./util')

function Config() {
  const config = yaml.load(pathFn.join(process.cwd(), 'config.yml'))
  const defaults = {
    title: 'AcyOrt',
    description: 'A Node.js blog tool powered by GitHub.',
    keywords: 'acyort, nodejs, github',
    rss: '',
    favicon: '',
    url: 'http://acyortjs.github.io',
    disqus: '',
    language: 'en',
    theme: 'ccc45',
    per_page: 3,
    archives_per_page: 30,
    thumbnail_mode: 2,
    menu: {},
    public_dir: '',
    category_dir: 'category',
    tag_dir: 'tag',
    post_dir: 'posts',
    archives_dir: 'archives',
    default_category: 'uncategorized',
    user: '',
    repository: '',
    json: false,
    dev: false,
    authors: [],
    token: '',
  }

  if (process.env.NODE_ENV === 'dev') {
    defaults.user = 'acyortjs'
    defaults.repository = 'acyortjs.github.io'
  }

  Object.keys(defaults).forEach((key) => {
    if (config[key] === undefined || config[key] === null) {
      config[key] = defaults[key]
    } else if (typeof config[key] === 'string' && config[key].indexOf('dir') > -1) {
      config[key] = strFormat(config[key])
    }
  })

  const url = urlFn.parse(config.url)
  const root = pathFn.parse(url.path).name

  config.url = `${url.protocol}//${url.host}`
  config.root = root ? `/${root}` : '/'

  return config
}

module.exports = Config
