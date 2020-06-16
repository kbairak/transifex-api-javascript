import axios from 'axios';
import _ from 'lodash';

import { JsonApi, Resource } from '../jsonapi';

const standardHeaders = {Accept: 'application/vnd.api+json',
                         'Content-Type': 'application/vnd.api+json',
                         Authorization: 'Bearer API_TOKEN'};

let _api = new JsonApi({host: 'https://rest.api.transifex.com',
                        auth: 'API_TOKEN'});

class Foo extends Resource {
  TYPE = "foos"
}
_api.register(Foo);

jest.mock('axios');

test('List', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {
    data: [{type: 'foos', id: '1', attributes: {name: 'One'}},
           {type: 'foos', id: '2', attributes: {name: 'Two'}}],
    links: {next: '/foos?page=2'}
  }}))

  let qs = await Foo.list().evaluate();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/foos',
    params: {},
    headers: standardHeaders,
    maxRedirects: 0,
  });

  expect(qs.data[0].id).toBe('1');
  expect(qs.data[0].attributes).toEqual({name: 'One'});
  expect(qs.data[1].id).toBe('2');
  expect(qs.data[1].attributes).toEqual({name: 'Two'});

  expect(qs.hasNext()).toBe(true);
  expect(qs.hasPrevious()).toBe(false);

  axios.request.mockResolvedValue(Promise.resolve({data: {
    data: [{type: 'foos', id: '3', attributes: {name: 'Three'}},
           {type: 'foos', id: '4', attributes: {name: 'Four'}}],
    links: {previous: '/foos?page=1'}
  }}))

  qs = await qs.next().evaluate();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/foos?page=2',
    params: {},
    headers: standardHeaders,
    maxRedirects: 0,
  });

  expect(qs.data[0].id).toBe('3');
  expect(qs.data[0].attributes).toEqual({name: 'Three'});
  expect(qs.data[1].id).toBe('4');
  expect(qs.data[1].attributes).toEqual({name: 'Four'});

  expect(qs.hasNext()).toBe(false);
  expect(qs.hasPrevious()).toBe(true);
});

test('Filters', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: [
    {type: 'foos', id: '1', attributes: {name: 'One'}},
    {type: 'foos', id: '3', attributes: {name: 'Three'}}
  ]}}))

  let qs = await Foo.list().filter({kind: 'odd'}).evaluate();

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/foos',
    params: {'filter[kind]': 'odd'},
    headers: standardHeaders,
    maxRedirects: 0,
  });

  expect(qs.data[0].id).toBe('1');
  expect(qs.data[0].attributes).toEqual({name: 'One'});
  expect(qs.data[1].id).toBe('3');
  expect(qs.data[1].attributes).toEqual({name: 'Three'});

  expect(qs.hasNext()).toBe(false);
  expect(qs.hasPrevious()).toBe(false);
});

test('Pagination', async () => {
  axios.request.
    mockResolvedValueOnce(Promise.resolve({data: {
      data: [{type: 'foos', id: '1', attributes: {name: 'One'}},
             {type: 'foos', id: '2', attributes: {name: 'Two'}}],
      links: {next: '/foos?page=2'},
    }})).
    mockResolvedValueOnce(Promise.resolve({data: {
      data: [{type: 'foos', id: '3', attributes: {name: 'Three'}},
             {type: 'foos', id: '4', attributes: {name: 'Four'}}],
      links: {previous: '/foos?page=1'},
    }}));

  const qs = Foo.list();
  const generator = qs.all();
  let result = [];
  while (true) {
    const {value, done} = await generator.next();
    if (! done) {
      result.push([value.id, value.get('name')]);
    }
    else {
      break;
    }
  }

  expect(result).toEqual([['1', 'One'], ['2', 'Two'],
                          ['3', 'Three'], ['4', 'Four']]);
})
