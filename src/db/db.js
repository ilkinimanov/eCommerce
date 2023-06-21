import mongoose from 'mongoose';

export const connect = async (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connection is successful...");
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
};
