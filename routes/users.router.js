const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
  res.json([{
    id: 1,
    name: 'Xavi', 
    password: '12345'
  }, 
  {
    id: 2,
    name: 'Mafe', 
    password: '12345'
  }

]
)

})

module.exports = router