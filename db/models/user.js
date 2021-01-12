/**
 * This exports the model for user
 * @param {import('mongoose').Mongoose} mongoose
 */
module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const todoSchema = new Schema({
    username: {
      type: String,
      required: true,
      immutable: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
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
