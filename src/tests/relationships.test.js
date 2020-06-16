import axios from 'axios';
import _ from 'lodash';

import { JsonApi, Resource } from '../jsonapi';

const standardHeaders = {Accept: 'application/vnd.api+json',
                         'Content-Type': 'application/vnd.api+json',
                         Authorization: 'Bearer API_TOKEN'};

let _api = new JsonApi({host: 'https://rest.api.transifex.com',
                        auth: 'API_TOKEN'});

class Child extends Resource {
  TYPE = "children"
}
_api.register(Child);

class Parent extends Resource {
  TYPE = "parents"
}
_api.register(Parent)

jest.mock('axios');

test('Fetch singular relationship', async () => {
  axios.request.mockResolvedValue(Promise.resolve({data: {data: {
    type: 'parents',
    id: '2',
    attributes: {name: "Dad"},
  }}}))

  let child = new Child({id: '1',
                         relationships: {parent: new Parent({id: '2'})}});
  let parent = await child.fetch('parent');

  expect(_.last(axios.request.mock.calls)[0]).toEqual({
    method: 'get',
    url: 'https://rest.api.transifex.com/parents/2',
    headers: standardHeaders,
    maxRedirects: 0,
  })

  expect(parent.attributes).toEqual({name: 'Dad'})
});
