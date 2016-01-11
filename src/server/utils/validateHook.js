import joi from 'joi';

const relativeUrlRegex = /^\/[a-zA-Z0-9\-\/]*$/;
const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
const methodSchema = joi.string().valid(httpMethods).insensitive();

const schema = joi.object().keys({
    method: joi.alternatives().try(
        methodSchema,
        joi.array().items(methodSchema).min(1)
    ).required(),
    path: joi.string().regex(relativeUrlRegex).required(),
    command: joi.string().required()
});

export default function validateHook(hook) {
    const result = joi.validate(hook, schema);
    if (result.error) throw new Error(`Invalid hook: ${result.error}`);
}
