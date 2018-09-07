import mongoose from 'mongoose';
import Campaign from './campaign';

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

export const startDB = ({
  user,
  pwd,
  url,
  db,
}) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`);

export const models = {
  Campaign,
};
