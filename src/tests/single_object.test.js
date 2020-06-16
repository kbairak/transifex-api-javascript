import axios from 'axios';
import _ from 'lodash';

import { JsonApi, Resource } from '../jsonapi';

const standardHeaders = {Accept: 'application/vnd.api+json',
                         'Content-Type': 'application/vnd.api+json',
                         Authorization: 'Bearer API_TOKEN'};

let _api = new JsonApi({host: 'https://rest.api.transifex.com',
                        auth: 'API_TOKEN'});

class Foo extends Resource {
  TYPE = 'foos';
}
_api.register(Foo);

jest.mock('axios');

test('Make some new objects', () => {
  let foo = new Foo({id: '1', attributes: {name: 'Joe'}});
  expect(foo.attributes).toEqual({name: 'Joe'});
  expect(foo.get('name')).toBe('Joe');

  let castor = new Foo({id: '1', attributes: {name: 'Castor'}});
  let pollux = new Foo({id: '2',
                        attributes: {name: 'Pollux'},
                        relationships: {brother: castor}});
  expect(pollux.relationships).
    toEqual({brother: {data: {type: 'foos', id: '1'}}});
  expect(pollux.related).toEqual({brother: castor});
  expect(pollux.get('brother')).toEqual(castor);

  castor = new Foo({id: '1', attributes: {name: 'Castor'}});
  pollux = new Foo({
    id: '2',
    attributes: {name: 'Pollux'},
    relationships: {brother: {data: {type: 'foos', id: '1'},
                              links: {related: '/foos/2/brother',
                                      self: '/foos/2/relationships/brother'}}},
  });
  expect(pollux.relationships).
    toEqual({brother: {data: {type: 'foos', id: '1'},
                       links: {related: '/foos/2/brother',
                               self: '/foos/2/relationships/brother'}}});
  expect(pollux.related.brother.id).toBe('1');
  expect(pollux.get('brother').id).toBe('1');
});

test('Foo.get() returns an instance', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'foos',
    id: '1',
    attributes: {hello: 'world'},
  }}}));
  const foo = await Foo.get('1');

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/foos/1',
    headers: standardHeaders,
    maxRedirects: 0,
  });

  expect(foo.id).toBe('1');
  expect(foo.attributes).toEqual({hello: 'world'});
});

test('foo.reload() fetches all the data', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'foos',
    id: '1',
    attributes: {hello: 'world'},
  }}}));
  const foo = new Foo({id: 1});
  await foo.reload();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/foos/1',
    headers: standardHeaders,
    maxRedirects: 0,
  });

  expect(foo.id).toBe('1');
  expect(foo.attributes).toEqual({hello: 'world'});
});

test('Resource.new() returns appropriate class', () => {
  const foo = _api.new({type: 'foos', id: '1'});
  expect(foo).toBeInstanceOf(Foo);
});

test('Save existing', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'foos',
    id: '1',
    attributes: {name: 'Bob', last_update: 'now'},
  }}}));

  let foo = new Foo({id: '1', attributes: {name: 'Bob'}});
  await foo.save('name');

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'patch',
    url: 'https://rest.api.transifex.com/foos/1',
    headers: standardHeaders,
    data: {data: {type: 'foos', id: '1', attributes: {name: 'Bob'}}},
    maxRedirects: 0,
  })
  expect(foo.get('last_update')).toBe('now');
});

test('Save new', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'foos',
    id: '1',
    attributes: {name: 'Bob', created_at: 'now'},
  }}}));

  let foo = new Foo({attributes: {name: 'Bob'}})
  await foo.save();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'post',
    url: 'https://rest.api.transifex.com/foos',
    headers: standardHeaders,
    data: {data: {type: 'foos', attributes: {name: 'Bob'}}},
    maxRedirects: 0,
  });

  expect(foo.id).toBe('1');
  expect(foo.attributes).toEqual({name: 'Bob', created_at: 'now'});
});

test('Create', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'foos',
    id: '1',
    attributes: {name: 'Bob', created_at: 'now'},
  }}}));

  let foo = await Foo.create({attributes: {name: 'Bob'}});

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'post',
    url: 'https://rest.api.transifex.com/foos',
    headers: standardHeaders,
    data: {data: {type: 'foos', attributes: {name: 'Bob'}}},
    maxRedirects: 0,
  });

  expect(foo.id).toBe('1');
  expect(foo.attributes).toEqual({name: 'Bob', created_at: 'now'});
});

test('Delete', async () => {
  axios.request.mockResolvedValue(Promise.resolve({}));

  let foo = new Foo({id: '1', attributes: {name: 'Bob'}});
  await foo.delete();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'delete',
    url: 'https://rest.api.transifex.com/foos/1',
    headers: standardHeaders,
    maxRedirects: 0,
  })
  expect(foo.id).toBe(null);
});
