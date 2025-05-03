import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  ownerId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  title: {  type: String,required: [true, 'Title is required'],trim: true},
  content: { type: String,required: [true, 'Content is required'],trim: true},
  category: { type: String,required: [true, 'Category is required'],trim: true},
  createdAt: {type: Date, default: Date.now}
});

// static method to create new blog
blogSchema.statics.createNewBlog = async function (data, ownerId) {
  const newBlog = new this({
    ownerId,
    ...data
  });

  return await newBlog.save();
};

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
