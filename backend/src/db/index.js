import mongoose from 'mongoose';
import Promise from 'bluebird';
import Campaign from './campaign';
import initDatabase from './initDatabase';

// SET UP Mongoose Promises.
mongoose.Promise = Promise;

export const startDB = ({
  user,
  pwd,
  url,
  db,
}) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`);

export const models = {
  Campaign,
};

export const initDB = initDatabase(models);
