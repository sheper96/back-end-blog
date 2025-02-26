const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const Post = require('../models/post')

exports.createPost = (req, res, next) => {
    const { title, content } = req.body
    console.log(req.body)
    const userId = req.user.id

    if (!title) {
        throw new (BadRequestError('Title required'))
    }
    if (!content) {
        throw new (BadRequestError('Content required'))
    }

    const post = new Post({
        title: title,
        content: content,
        author: userId
    })

    post.save()
        .then(post => {
            res.status(200).json({
                message: "Post Crerated Succesfully",
                post: post
            })
        })
        .catch(err => {
            next(err)
        });

}

exports.getAllPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments();
    try {
        const posts = await Post.find().skip(startIndex).limit(limit).sort({ _id: -1 });
        res.status(200).json({
            message: "Posts Fetched Succesfully",
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            posts: posts
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error Fetching Posts"
        })
    }
}

exports.getMyPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments({ author: req.user.id });

    try {
        const userId = req.user.id
        const posts = await Post.find({ author: userId }).skip(startIndex).limit(limit).sort({ _id: -1 })
        res.status(200).json({
            message: "Posts Fetched Succesfully",
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            posts: posts
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error Fetching Posts"
        })
    }
}

exports.getPostById = async (req, res, next) => {
    console.log('get')
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post){
            throw new NotFoundError('Post not found')
        }
        res.status(200).json({
            message: "Post Fetched Succesfully",
            post: post
        })
    }
    catch (err) {
       next(err)
    }
}


exports.deleteMyPostById = async (req, res, next) => {

    try {
        const userId = req.user.id
        const postId = req.params.postId
        const post = await Post.findOneAndDelete({ author: userId, _id: postId })
        if (!post) {
            throw new NotFoundError('Post Not Found Or Already Deleted')
        }
        else {
            res.status(200).json({
                message: "Posts Deleted Succesfully",
            })
        }
    }
    catch (err) {
        next()
    }
}

exports.updateMyPostById = async (req, res, next) => {

    try {
        const userId = req.user.id
        console.log(userId + "userId")
        const postId = req.params.postId
        console.log(req.body)
        const { title, content } = req.body
        if (!title) {
            return res.status(400).json({ message: "Title  required!" });
        }
        if (!content) {
            return res.status(400).json({ message: "Content  required!" });
        }
        const post = await Post.findOneAndUpdate({ author: userId, _id: postId }, { title: title, content: content }, { new: true })
        console.log(post)
        if (!post) {
            throw new (NotFoundError('Post Not Found '))
        }
        else {
            res.status(200).json({
                message: "Posts Updated Succesfully",
                post: post
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Error Updating a Post"
        })
    }
}