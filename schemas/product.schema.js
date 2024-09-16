const Joi = require('joi');

// const id = validator.string().uuid();
// const name = validator.string().uuid();


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(8).max(50)

const createProductShema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required()
});

const updateProductSchema = Joi.object({
  id: id.required(),
  name: name,
  price: price,
  description: description,
})

const getProductSchema = Joi.object({
  id: id.required(),

})

module.exports = {createProductShema, updateProductSchema, getProductSchema}