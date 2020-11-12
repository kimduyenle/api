const _ = require('lodash');
const models = require('../models');
const { bucket } =  require('../utils/uploadImage');
class ImageController {
//   async getAllStatuses(req, res) {
//     try {
//       const statuses = await models.Status.findAll({
//         where: { isDeleted: false }
//       });
//       if (!statuses) {
//         return res.status(200).json('Status not found');
//       }
//       const data = {};
//       data.statuses = statuses;
//       return res.status(200).json(data);
//     } catch (error) {
//       return res.status(400).json(error.message)
//     }
//   }

//   async getStatus(req, res) {
//     try {
//       const status = await models.Status.findOne({
//         where: {
//           id: Number(req.params.id),
//           isDeleted: false
//         },
//       })
//       if (!status) {
//         return res.status(200).json('Status not found');
//       }
//       const data = {};
//       data.status = status;
//       return res.status(200).json(data);
//     } catch (error) {
//       return res.status(400).json(error.message);
//     }
//   }

  async uploadProductImage(req, res, next) {
    try {
        if (!req.file) {
          res.status(400).json('Error, could not upload file');
          return;
        }

        const product = await models.Product.findOne({
            where: { id: Number(req.params.productId), isDeleted: false }
        });
        if (!product) {
            return res.status(400).json('Product not found');
        }
    
        // Create new blob in the bucket referencing the file
        const blob = bucket.file(req.file.originalname);
    
        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
    
        blobWriter.on('error', (err) => next(err));
    
        blobWriter.on('finish', async () => {
          // Assembling public URL for accessing the file via HTTP
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

          const data = {
            productId: Number(req.params.productId),
            path: publicUrl
            }
        const image = await models.Image.create(data);
        if (!image) {
            return res.status(400).json('Error');
          }
          return res.status(201).json(image);
          // Return the file name and its public URL
        //   res
        //     .status(200)
        //     .json({ fileName: req.file.originalname, fileLocation: publicUrl });
        });
    
        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
      } catch (error) {
        res.status(400).json(`Error, could not upload file: ${error}`);
        return;
      }
  }

  async updateStatus(req, res) {
    try {
      const status = await models.Status.findOne({
        where: {
          id: Number(req.params.id),
          isDeleted: false
        },
      });
      status.name = req.body.name;
      if (status.save()) {
        return res.status(200).json(status);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteStatus(req, res) {
    try {
      const status = await models.Status.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      status.isDeleted = true;

      if (status.save()) {
        return res.status(200).json(status);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new ImageController()