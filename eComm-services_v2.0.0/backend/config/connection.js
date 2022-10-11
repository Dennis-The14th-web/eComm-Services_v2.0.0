import mongoose from 'mongoose';

import config from './index.js'


mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

  export default mongoose.connection;