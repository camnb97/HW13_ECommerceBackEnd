const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// WORKS 
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    }
  )
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////
// WORKS
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////
// error: "value" "id" and "validatorName" are all null
//but it is working
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,

  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

});

////////////////////////////////////////////////
// WORKS
// "api/categories/7"
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

////////////////////////////////////////////////
//
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }

    })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
