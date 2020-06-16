import axios from 'axios';

export default class JsonApi {
  constructor({host, auth}) {
    this.registry = {};
    this.setup({host, auth})
  }

  setup({host, auth}) {
    if (host) {
      this.host = host;
    }
    if (auth) {
      if (typeof(auth) == 'string') {
        this.make_auth_headers = () => {
          return { Authorization: `Bearer ${auth}` };
        };
      }
      else {
        this.make_auth_headers = auth;
      }
    }
  }

  register(klass) {
    const TYPE = (new klass({})).TYPE;
    if (TYPE) {
      this.registry[TYPE] = klass;
    }
    klass.API = this;
    klass.prototype.API = this;
    return klass
  }

  async request({url, headers, ...kwargs}) {
    if (url.startsWith('/')) {
      url = this.host + url;
    }
    if (! headers) {
      headers = {};
    }
    Object.assign(headers,
                  this.make_auth_headers(),
                  {Accept: 'application/vnd.api+json',
                   'Content-Type': 'application/vnd.api+json'});
    const response = await axios.request({url,
                                          headers,
                                          maxRedirects: 0,
                                          ...kwargs});
    return response.data;
  }

  new(data) {
    if ('data' in data) {
      data = data.data;
    }
    const klass = this.registry[data.type];
    return new klass(data);
  }

  asResource(data) {
    try {
      return this.new(data);
    }
    catch (error) {
      return data;
    }
  }

  async get({id, type, include}) {
    let instance = this.new({type, id})
    instance.reload(include);
    return instance;
  }
}
