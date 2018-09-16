import mongoose from 'mongoose';
import Promise from 'bluebird';
import Campaign from './campaign';
import Image from './image';
import initDatabase from './initDatabase';


// SET UP Mongoose Promises.
mongoose.Promise = Promise;

export const models = {
  Campaign,
};

export const startDB = ({
  user,
  pwd,
  url,
  db,
  mongoOptions,
}) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`, mongoOptions).then(() => {
  const dependencies = {
    mongoose,
    connection: mongoose.connection,
    models,
    images: Image,
    url: `mongodb://${user}:${pwd}@${url}/${db}`,
  };
  return initDatabase(dependencies)
    .then(() => dependencies);
});
