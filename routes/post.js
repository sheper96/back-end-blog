const express = require('express');

const router = express.Router();
const postController = require('../controllers/post');
const { authenticate } = require('../middleware/authMiddleware')
const { validateRequest } = require('../middleware/validateRequest')
const postSchema = require('../validators/postValidator')

router.post('/', authenticate, validateRequest(postSchema), postController.createPost)
router.get('/', authenticate, postController.getAllPosts)
router.get('/my', authenticate, postController.getMyPosts)
router.get('/:postId', authenticate, postController.getPostById)
router.delete('/:postId', authenticate, postController.deleteMyPostById)
router.put('/:postId', authenticate, postController.updateMyPostById)



module.exports = router;