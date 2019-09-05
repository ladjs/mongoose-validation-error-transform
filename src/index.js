const _ = require('lodash');
const capitalize = require('capitalize');
const humanize = require('humanize-string');

function mongooseValidationErrorTransform(schema, options) {
  options = _.defaults(options || {}, {
    capitalize: true,
    humanize: true,
    transform: messages => messages.join(', ')
  });

  function humanizePath(err, doc, next) {
    if (err.name !== 'ValidationError' || !_.isObject(err.errors)) {
      return next(err);
    }

    err.message = options.transform(
      _.map(_.values(err.errors), error => {
        if (!_.isString(error.path)) {
          return options.capitalize ? capitalize(error.message) : error.message;
        }

        if (options.humanize) {
          error.message = error.message.replace(
            new RegExp(error.path, 'g'),
            humanize(error.path)
          );
        }

        if (options.capitalize) {
          error.message = capitalize(error.message);
        }

        return error.message;
      })
    );

    next(err);
  }

  schema.post('save', humanizePath);
  schema.post('update', humanizePath);
  schema.post('findOneAndUpdate', humanizePath);
  schema.post('insertMany', humanizePath);

  return schema;
}

module.exports = mongooseValidationErrorTransform;
