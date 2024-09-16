const express = require('express')

const ProductsService = require('./../services/product.service'); 
const { required } = require('joi');
const {validatorHandler} = require('./../middlewares/validator.handler')
const {createProductShema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema')
 
//Como no tienes acceso desde acá a la aplicación se crea un router aparte
const router = express.Router()
const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find()
    res.json(products)
    
  } catch (error) {
    next(error)
  }
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
});


router.get('/:id', 
  validatorHandler(getProductSchema, 'params'),

  async (req, res, next) => {
  try {    
    const {id} = req.params;
    const product = await service.findOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }

})

//Método para crear o adicionar un producto

router.post('/',
  validatorHandler(createProductShema, 'body'),
  async (req, res) => {
  try {
    
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })  
  }
})

//Modificar un producto de acuerdo a una id

router.patch('/:id', validatorHandler(updateProductSchema, 'params'),
async (req, res, next) => {
  try {    
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})


//Eliminar un producto de acuerdo a una id

router.delete('/:id',async (req, res) => {
  try {    
    const {id} = req.params;
    const rta = await service.delete(id)
    res.json(rta)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
  
})



module.exports = router