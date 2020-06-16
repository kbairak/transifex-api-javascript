import * as _ from 'lodash';
import Queryset from './querysets';

export default class Resource {
  TYPE = null;
  EDITABLE = null;

  constructor(data) {
    if ('data' in data) {
      data = data.data;
    }
    this._overwrite(data);
  }

  _overwrite({ id, attributes, relationships, links, ...kwargs }) {
    this.id = id || null;
    this.attributes = attributes || {};
    this.links = links || {};

    [this.relationships, this.related] = [{}, {}];
    for (const [key, value] of Object.entries(relationships || {})) {
      this._setRelationship(key, value);
      if (! this.relationships[key] || 'data' in this.relationships[key]) {
        this._setRelated(key, value);
      }
    }

    // TODO: included
  }

  _setRelationship(key, value) {
    if (value instanceof Resource) {
      this.relationships[key] = value.asRelationship();
    }
    else {
      if (value &&
          _.isEqual(_.sortBy(Object.keys(value)),
                    _.sortBy(['id', 'type']))) {
        value = {data: value};
      }
      if (!value || 'data' in value || 'links' in value) {
        // Resource identifier was passed
        this.relationships[key] = value;
      }
      else {
        throw `Invalid type '${value}' for relationship '${key}'`;
      }
    }
  }

  _setRelated(key, value) {
    if (! (key in this.relationships)) {
      throw `Cannot change relationship '${key}' because it's not an existing relationship`;
    }
    if (this.relationships[key] && ! ('data' in this.relationships[key])) {
      throw `Cannot change relationship '${key}' because it's a plural relationship. Use .add()', '.remove()' or '.reset()' instead`
    }
    value = this.API.asResource(value);
    const fromNullToNotNull = !! (! this.relationships[key] && value);
    const fromNotNullToNull = !! (this.relationships[key] && ! value);
    const dataChanged = !! (this.relationships[key] &&
                            value &&
                            ! _.isEqual(this.relationships[key].data,
                                        value.asResourceIdentifier()));
    if (fromNullToNotNull || fromNullToNotNull || dataChanged) {
      if (value) {
        this.relationships[key] = null;
      }
      else {
        this.relationships[key] = value;
      }
    }
    this.related[key] = value;
  }

  static asResource(data) {
    try {
      return this(data);
    }
    catch (error) {
      return data;
    }
  }

  get(key) {
    if (key in this.attributes) {
      return this.attributes[key];
    }
    else if (key in this.related) {
      return this.related[key];
    }
    else {
      return undefined;
    }
  }

  set(key, value) {
    if (key in this.attributes) {
      this.attributes[key] = value;
    }
    else if (key in this.relationships) {
      this._setRelated(key, value);
    }
    else {
      throw `'${key}' is not an attribute or relationship`;
    }
  }

  async reload() {
    const url = this.links.self || `/${this.TYPE}/${this.id}`;
    // TODO: include
    const responseBody = await this.API.request({method: 'get', url});
    // TODO: redirects
    this._overwrite(responseBody.data);
  }

  static async get(id) {
    let result = new this({id});
    await result.reload();
    return result;
  }

  async fetch(...relationshipNames) {
    let force = false;
    const last = relationshipNames[relationshipNames.length - 1];
    if (relationshipNames.length > 1 && ! _.isString(last)) {
      force = !! last.force;
      relationshipNames.pop();
    }

    for (const relationshipName of relationshipNames) {
      if (! (relationshipName in this.relationships)) {
        throw `'${relationshipName}' is not a relationship`
      }

      const relationship = this.relationships[relationshipName];

      if (! relationship) {
        continue;
      }

      const isSingularFetched = (
        this.related[relationshipName] instanceof Resource &&
        (_.size(this.related[relationshipName].attributes) ||
         _.size(this.related[relationshipName].relationships))
      );
      const isPluralFetched = (
        this.related[relationshipName] instanceof Queryset
      );
      if ((isSingularFetched || isPluralFetched) && ! force) {
        continue;
      }

      if ('data' in relationship) {
        await this.related[relationshipName].reload();
      }
      else {
        const url = ((relationship.links || {}).related ||
                     `/${this.TYPE}/${this.id}/${relationshipName}`);
        this.related[relationshipName] = new Queryset(this.API, url);
      }
    }

    if (relationshipNames.length == 1) {
      return this.related[relationshipNames[0]];
    }
  }

  static list() {
    const TYPE = (new this({}).TYPE);
    return new Queryset(this.API, `/${TYPE}`);
  }

  async save(...fields) {
    let responseBody;
    if (this.id) {
      responseBody = await this._saveExisting(...fields);
    }
    else {
      responseBody = await this._saveNew(...fields);
    }
    const data = responseBody.data;

    let related = Object.assign({}, this.related);
    for (const [relationshipName, relatedInstance] of Object.entries(related)) {
      if (relatedInstance instanceof Queryset) {
        continue;
      }

      const currentId = relatedInstance.id;
      const newId = (data.relationships[relationshipName].data || {}).id
      if (currentId != newId) {
        if (newId) {
          related[relationshipName] = this.API.new(
            data.relationships[relationshipName]
          );
        }
        else {
          delete related[relationshipName];
        }
      }
    }

    const relationships = data.relationships || {};
    delete data.relationships;
    Object.assign(relationships, related);
    this._overwrite({relationships, ...data});
  }

  async _saveExisting(...fields) {
    let payload = this.asResourceIdentifier();
    Object.assign(payload, this._generateDataForSaving(...fields));
    return await this.API.request({method: 'patch',
                                   url: this._getUrl(),
                                   data: {data: payload}});
  }

  async _saveNew(...fields) {
    let payload = {type: this.TYPE};
    Object.assign(payload, this._generateDataForSaving(...fields));
    return await this.API.request({method: 'post',
                                   url: `/${this.TYPE}`,
                                   data: {data: payload}});
  }

  _generateDataForSaving(...fields) {
    let result = {};
    const editableFields = fields || this.EDITABLE || [];
    if (editableFields.length) {
      for (const field of editableFields) {
        if (field in this.attributes) {
          if (! ('attributes' in result)) {
            result.attributes = {};
          }
          result.attributes[field] = this.attributes[field];
        }
        else if (field in this.relationships) {
          if (! ('relationships' in result)) {
            result.relationships = {};
          }
          result.relationships[field] = this.relationships[field];
        }
      }
    }
    else {
      if (_.size(this.attributes)) {
        result.attributes = this.attributes;
      }
      if (_.size(this.relationships)) {
        result.relationships = this.relationships;
      }
    }
    return result;
  }

  static async create(data) {
    let instance = new this(data);
    if (instance.id) {
      throw "'id' supplied as part of a new instance"
    }
    await instance.save();
    return instance;
  }

  // TODO: createWithForm, follow

  async delete() {
    await this.API.request({method: 'delete', url: this._getUrl()});
    this.id = null;
  }

  // TODO: edit relationships, bulk actions

  asResourceIdentifier() {
    return {type: this.TYPE, id: this.id};
  }

  asRelationship() {
    return {data: this.asResourceIdentifier()};
  }

  _getUrl() {
    if ('self' in this.links) {
      return this.links.self;
    }
    else {
      return `/${this.TYPE}/${this.id}`;
    }
  }
}
