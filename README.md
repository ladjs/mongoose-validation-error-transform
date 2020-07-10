# mongoose-validation-error-transform

[![Slack Status][slack-image]][slack-url]
[![NPM version][npm-image]][npm-url]
[![Standard JS Style][standard-image]][standard-url]
[![MIT License][license-image]][license-url]

> Automatically transform [Mongoose][mongoose] validation error message(s) to a humanized and readable format, built for [CrocodileJS][crocodile-url].


## Index

* [Install](#install)
* [Usage](#usage)
* [License](#license)


## Install

```bash
npm install --save mongoose-validation-error-transform
```

> You may also want to use [mongoose-beautiful-unique-validation][mongoose-beautiful-unique-validation] too (see [this comment][comment])!


## Usage

```js
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');

mongoose.plugin(mongooseValidationErrorTransform, {

  //
  // these are the default options you can override
  // (you don't need to specify this object otherwise)
  //

  // should we capitalize the first letter of the message?
  capitalize: true,

  // should we convert `full_name` => `Full name`?
  humanize: true,

  // how should we join together multiple validation errors?
  transform: function(messages) {
    return messages.join(', ');
  }

});
```

If you have a Mongoose schema defined with a required String field `full_name`,
and if there is an error with a missing `full_name` on a document - then it will
automatically rewrite the message of `full_name is required` to
`Full name is required`.

If there are multiple validation error messages, such as:

* `full_name is required`
* `age is not at least (18)`

Then it will rewrite the error message to `Full name is required, Age is not at least (18)`.

Of course - by modifying the options mentioned above, you can transform the messages however you'd like.

For example, if you'd like to output a `<ul>` HTML tag with `<li>` for each error (but only of course if there's more than one error):

```js
mongoose.plugin(mongooseValidationErrorTransform, {
  transform: function(messages) {
    if (messages.length === 1) return messages[0];
    return `<ul><li>${messages.join('</li><li>')}</li></ul>`;
  }
});
```

This would output the following for the previous example:

```html
<ul><li>Full name is required</li><li>Age is not at least (18)</li></ul>
```


## License

[MIT](LICENSE) © Nick Baugh


## 

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg

[license-url]: LICENSE

[npm-image]: https://img.shields.io/npm/v/mongoose-validation-error-transform.svg

[npm-url]: https://npmjs.org/package/mongoose-validation-error-transform

[crocodile-url]: https://crocodilejs.com

[standard-image]: https://img.shields.io/badge/code%20style-standard%2Bes7-brightgreen.svg

[standard-url]: https://github.com/crocodilejs/eslint-config-crocodile

[slack-image]: https://img.shields.io/badge/chat-join%20slack-brightgreen

[slack-url]: https://join.slack.com/t/ladjs/shared_invite/zt-fqei6z11-Bq2trhwHQxVc5x~ifiZG0g

[mongoose]: https://github.com/Automattic/mongoose

[comment]: https://github.com/Automattic/mongoose/issues/2284#issuecomment-320810641

[mongoose-beautiful-unique-validation]: https://github.com/matteodelabre/mongoose-beautiful-unique-validation
