import express from 'express';
import {  getAllBlogs,createBlog,deleteBlog} from '../controllers/BlogController.js';
import { blogValidationRules,validateBlog } from '../middleware/BlogValidator.js';
import protectRoutes from '../middleware/authorisedOrNotMiddleware.js'

const blogRouter = express.Router();

blogRouter.get('/getallblogs', getAllBlogs); // Public route
blogRouter.post('/add', protectRoutes, blogValidationRules,validateBlog, createBlog); // Auth required
blogRouter.delete('/del/:id', protectRoutes, deleteBlog); // Auth required
blogRouter.get('/getuserblogs', protectRoutes, getBlogByUserId); // Auth required

export default blogRouter;