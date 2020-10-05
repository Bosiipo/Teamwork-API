import path from 'path';
import fs from 'fs';
import Gif from '../models/Gif.model';
import Comment from '../models/Comment.model';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class GifController {
  static async createGif(req, res) {
    try {
      const { title } = req.body;
      const { image } = req.files;
      const employeeId = req.employee.id;
      // Write a function to upload to cloudinary, but a function that first creates and stores the imagePath in our code directory
      const uploadImage = imagePath =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(imagePath, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });

      // Create a path to store the cloudinary image
      const imagePath = path.resolve(`./API/src/temp_images/${image.name}`);

      // Use the mv() method to place the file in upload directory (i.e. "src/temp_images")
      await image.mv(imagePath);

      const result = await uploadImage(imagePath);

      fs.unlink(imagePath, error => {
        if (error) throw new Error(error.message);
      });
      await Gif.create({
        employeeId,
        title,
        imageUrl: result.secure_url,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          // gifId: employeeId,
          message: 'Successfully created Gif',
          title,
          result: result.secure_url,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async deleteGif(req, res) {
    try {
      const { id } = req.params;
      const employeeId = req.employee.id;
      const gif = await Gif.findOne({ where: { id } });
      if (!id) {
        throw new Error(`Gif with ${id} does not exist`);
      }
      // If particular gif id is not equal to the id of the person that created it
      if (gif.employeeId !== req.employee.id) {
        throw new Error('You cannot do that!');
      }
      await Gif.destroy({ where: { id } });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Gif successfully deleted',
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async fetchAllGif(req, res) {
    try {
      const gifs = await Gif.findAll({
        where: { employeeId: req.employee.id },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({
        status: 'success',
        data: {
          gifs,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async addComment(req, res) {
    try {
      const gifId = req.params.id;
      const { comment } = req.body;
      const newComment = await Comment.create({
        gifId: Number(gifId),
        comment,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Comment successfully added!',
          newComment,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async getGif(req, res) {
    try {
      const { id } = req.params;
      const gif = await Gif.findOne({ where: { id } });
      if (!id) {
        throw new Error('Invalid parameter');
      }
      return res.status(200).json({
        status: 'success',
        data: {
          gif,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }
}

export default GifController;
