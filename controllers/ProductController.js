const _ = require('lodash');
const models = require('../models');
const paginate = require('../utils/paginate');
const getUserInfo = require('../utils/getUserInfo');
class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await models.Product.findAll({
        where: { isDeleted: false },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
          },
          {
            model: models.Image,
            as: 'images'
          }
				],
      });
      if (!products) {
        return res.status(200).json('Product not found');
      }
      const data = {};
      data.products = products;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getProductsPerPage(req, res) {
    try {
      const products = await models.Product.findAll({
        where: { isDeleted: false },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
          },
          {
            model: models.Image,
            as: 'images'
          }
				],
      });
      if (!products) {
        return res.status(200).json('Product not found');
      }
      const atPage = parseInt(req.query.page) || 1;
      const result = paginate(products, atPage, 6);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getProductsOfUser(req, res) {
    try {
      // get userId trong token va kiem tra
      const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(200).json('User not found');
      }
      const products = await models.Product.findAll({
        where: { userId: userId, isDeleted: false },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
          },
          {
            model: models.Image,
            as: 'images'
          }
				],
      });
      if (!products) {
        return res.status(200).json('Product not found');
      }
      const data = {};
      data.products = products;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getProductsOfCategory(req, res) {
    try {
      const categoryId = Number(req.params.categoryId);
      const category = await models.Category.findOne({ where: { id: categoryId, isDeleted: false } });
      if (!category) {
        return res.status(200).json('Category not found');
      }
      const products = await models.Product.findAll({
        where: { categoryId: categoryId, isDeleted: false },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
          },
          {
            model: models.Image,
            as: 'images'
          }
				],
      });
      if (!products) {
        return res.status(200).json('Product not found');
      }
      const data = {};
      data.products = products;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getProduct(req, res) {
    try {
      const product = await models.Product.findOne({
        where: {
          id: Number(req.params.id),
          isDeleted: false
        },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
          },
          {
            model: models.Image,
            as: 'images'
          }
				],
      })
      if (!product) {
        return res.status(200).json('Product not found');
      }
			const data = {};
			product.dataValues.user = product.user.username;
			product.dataValues.category = product.category.name;
      data.product = product;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createProduct(req, res) {
    try {
      const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      const category = await models.Category.findOne({
        where: { id: Number(req.body.categoryId), isDeleted: false }
      });
      if (!category) {
        return res.status(400).json('Category not found');
      }

      const data = req.body;
      data.userId = userId;
      data.status = true;

      const newProduct = await models.Product.create(data);
      if (!newProduct) {
        return res.status(400).json('Error');
      }
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      // get userId trong token
      const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      if (req.body.categoryId) {
        const category = await models.Category.findOne({
          where: { id: Number(req.body.categoryId), isDeleted: false  }
        });
        if (!category) {
          return res.status(400).json('Category not found');
        }
      }
      
      const product = await models.Product.findOne({
        where: {
          id: Number(req.params.id),
          isDeleted: false 
        },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Category,
            as: 'category',
					}
				],
      });

      if(userId !== product.userId) {
        return res.status(401).json('No permission');
      }
      product.categoryId = req.body.categoryId;
      product.name = req.body.name;
      product.description = req.body.description;
      product.quantity = req.body.quantity;
      product.price = req.body.price;
      product.status = req.body.status;

      if (product.save()) {
        return res.status(200).json(product);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await models.Product.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      product.isDeleted = true;

      if (product.save()) {
        return res.status(200).json(product);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new ProductController()

// const paging = (products, atPage, numberPerPage) => {
//   if (isNaN(atPage)) {
//       return { error: 'Page is not a number' };
//   }
//   const totalPage = parseInt(products.length / numberPerPage) + 1;
//   if (atPage > totalPage) {
//       return { error: 'Current page is greater than total page' };
//   }

//   const startIndex = (atPage - 1) * numberPerPage;
//   const endIndex = atPage * numberPerPage;
//   const productsInPage = products.slice(startIndex, endIndex);

//   result = {
//       totalProducts: products.length,
//       totalProductsInPage: productsInPage.length,
//       totalPage: totalPage,
//       productsInPage: productsInPage,
//   };
//   return result;
// }