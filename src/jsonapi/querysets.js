import _ from 'lodash';

export default class Queryset {
  constructor(API, url, params) {
    this.API = API;
    this.url = url;
    this.params = params || {};

    this.data = null;
    this.length = null;
    this._nextUrl = null;
    this._previousUrl = null;
  }

  async evaluate() {
    if (this.data) {
      return this;
    }

    const responseBody = await this.API.request({method: 'get',
                                                 url: this.url,
                                                 params: this.params})
    this.data = _.map(responseBody.data, (item) => this.API.new(item));
    this._nextUrl = (responseBody.links || {}).next || null;
    this._previousUrl = (responseBody.links || {}).previous || null;
    this.length = this.data.length;
    return this;
  }

  hasNext() {
    this.evaluate();
    return !! this._nextUrl;
  }

  next() {
    this.evaluate();
    return new Queryset(this.API, this._nextUrl, this.params);
  }

  hasPrevious() {
    this.evaluate();
    return !! this._previousUrl;
  }

  previous() {
    this.evaluate();
    return new Queryset(this.API, this._previousUrl, this.params);
  }

  filter(filters) {
    const Resource = require('./resources').default;
    let params = Object.assign({}, this.params);
    for (const [key, value] of Object.entries(filters)) {
      let new_key = 'filter';
      for (const part of key.split('__')) {
        new_key += `[${part}]`;
      }
      if (value instanceof Resource) {
        value = value.id;
      }
      params[new_key] = value;
    }
    return new Queryset(this.API, this.url, params);
  }

  async *allPages() {
    await this.evaluate();
    if (this.length) {
      yield this;
    }
    let page = this;
    while (page.hasNext()) {
      page = await page.next().evaluate();
      yield page;
    }
  }

  async *all() {
    const generator = this.allPages();

    while (true) {
      const {value, done} = await generator.next();
      if (! done) {
        for (const item of value.data) {
          yield item;
        }
      }
      else {
        break;
      }
    }
  }
}
