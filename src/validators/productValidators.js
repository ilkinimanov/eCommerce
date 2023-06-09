exports.imageExtensionValidator = (value) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = value.substr(value.lastIndexOf('.')).toLowerCase();
  return allowedExtensions.includes(fileExtension);
};
