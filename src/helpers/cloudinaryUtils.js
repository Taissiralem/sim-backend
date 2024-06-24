const cloudinary = require('../config/cloudinaryConfig');

// Function to extract the public ID from the URL
function getPublicIdFromUrl(url) {
  // Assuming URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<public_id>.<format>
  const parts = url.split('/');
  const publicIdWithFormat = parts.slice(-1)[0]; // Extract the last part of the URL
  const publicId = publicIdWithFormat.split('.')[0]; // Remove the file extension
  return publicId;
}

// Function to delete the image
exports.deleteImage = async (url) =>{
  const publicId = getPublicIdFromUrl(url);
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Delete result:', result);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}