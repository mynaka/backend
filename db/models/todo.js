const { v4: uuid } = require('uuid');

/**
 * This exports the model for todo
 * @param {import('mongoose').Mongoose} mongoose
 */
module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const todoSchema = new Schema({
    id: {
      type: String,
      immutable: true,
      index: true,
      unique: true,
      default: uuid
    },
    text: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    },
    dateCreated: {
      type: Number,
      required: true,
      default: () => new Date().getTime()
    },
    dateUpdated: {
      type: Number,
      required: true,
      default: () => new Date().getTime()
    }
  });

  return mongoose.model('Todo', todoSchema);
};
