const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductsService {
  constructor() {
    //Para este ejemplo no se trabaja con DB sino guardando los datos en memoris
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100
    for (let index = 0; index < limit; index++) {
    this.products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url()
    })
    
  }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 2000)
    })

    
  }

  async findOne(id){const product=this.products.find(item=>item.id===id); 
    if(!product){throw boom.notFound('product not found');}
    if(product.isBlock){throw boom.conflict('product is block');}
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw new Error('Product not fount');
    }
    this.products.splice(index, 1);
    return {id}
  }
}

module.exports = ProductsService