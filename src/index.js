import { Resource, JsonApi } from './jsonapi';

let _api = new JsonApi({host: 'https://rest.api.transifex.com'})

export function setup(auth, host = 'https://rest.api.transifex.com') {
  _api.setup({host, auth});
}

export class Organization extends Resource {
  TYPE = 'organizations';
}
_api.register(Organization);

export class Project extends Resource {
  TYPE = 'projects';
}
_api.register(Project);

// TODO: the rest
