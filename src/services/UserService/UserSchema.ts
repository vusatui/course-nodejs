import * as joi from "joi";

export default joi.object({
    login: joi.string().required(),
    password: joi.string().alphanum().required(),
    age: joi.number().min(4).max(130).required(),
}).required();
