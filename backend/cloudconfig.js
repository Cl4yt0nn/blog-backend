const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'dgph8ugky', 
    api_key: '517221648473618', 
    api_secret: '***************************' 
  });


  module.exports = cloudinary;