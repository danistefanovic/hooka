import joi from 'joi';
import httpMethods from 'methods';

const relativeUrlRegex = /^\/[a-zA-Z0-9\-\/]*$/;
const matchTypes = ['exactly', 'regexp', 'hmac-sha1'];
const validationSources = ['jsonBody', 'urlencodedBody', 'header'];
const methodSchema = joi.string().valid(httpMethods).insensitive();

const schema = joi.object().keys({
    method: joi.alternatives().try(
        methodSchema,
        joi.array().items(methodSchema).min(1)
    ).required(),
    path: joi.string().regex(relativeUrlRegex).required(),
    command: joi.string().required(),
    cwd: joi.string(),
    validate: joi.array().items(joi.object().keys({
        source: joi.string().valid(validationSources).insensitive().required(),
        find: joi.string().required(),
        match: joi.string().valid(matchTypes).insensitive().required(),
        value: joi.any().required()
    })),
    parseJson: joi.array().items(joi.object().keys({
        query: joi.string().required(),
        variable: joi.string().required()
    }))
});

/**
 * Validates a hook
 * @param {Object} hook
 * @return {void}
 * @throws Will throw an error if the hook is invalid
 */
export default function validateHook(hook) {
    const result = joi.validate(hook, schema);
    if (result.error) {
        throw new Error(`Invalid hook:
            ${result.error}
            ${JSON.stringify(hook, null, '  ')}
        `);
    }
}
