Transifex APIv3 SDK for Javascript.

Attempts to mirror the functionality of [the python implementation](/kbairak/transifex-api-python).

Sample usage of {json:api} part:

```javascript
import {JsonApi, Resource} from './src/jsonapi';

let _api = new JsonApi({host: 'https://some.api.com', auth: '<API_TOKEN>'});

class Author extends Resource {
  TYPE = 'authors'
}
_api.register(Author);

class Article extends Resource {
  TYPE = 'articles'
}
_api.register(Article);

async function main() {
  const articles = await Article.list().evaluate();
  const article = articles.data[1];
  console.log(article.get('title'));
  const author = await article.fetch('author');
  console.log(author.get('name'));
}

main();
```
