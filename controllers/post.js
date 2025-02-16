const Post = require('../models/post')

exports.createPost = (req, res, next) => {
    const { title, content } = req.body
    const userId = req.user.id

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
            res.status(400).json({
                message: 'Error While Creating a New Post'
            })
        })
}

exports.getAllPosts = async (req, res, next) => {

    try {
        const posts = await Post.find()
        res.status(200).json({
            message: "Posts Fetched Succesfully",
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

    try {
        const userId = req.user.id
        const posts = await Post.find({ author: userId })
        res.status(200).json({
            message: "Posts Fetched Succesfully",
            posts: posts
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error Fetching Posts"
        })
    }
}

exports.deleteMyPostById = async (req, res, next) => {

    try {
        const userId = req.user.id
        const postId = req.params.postId
        const post = await Post.findOneAndDelete({ author: userId, _id: postId })
        if (!post) {
            res.status(200).json({
                message: "Post Not Found Or Already Deleted"
            })
        }
        else {
            res.status(200).json({
                message: "Posts Deleted Succesfully",
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Error Deleting Post"
        })
    }
    // const userId = req.user.id
    // const postId = req.params.postId

    // Post.findOneAndDelete({ author: userId, _id: postId }).then(post => {
    //     if (!post) {
    //         res.status(200).json({
    //             message: "Post Not Found Or Already Deleted"
    //         })
    //     }
    //     else {
    //         res.status(200).json({
    //             message: "Posts Deleted Succesfully",
    //         })
    //     }
    // })
    //     .catch(err => {
    //         res.status(400).json({
    //             message: "Error Deleting Post"
    //         })
    //     })
}

exports.updateMyPostById = async (req, res, next) => {

    try{
        const userId = req.user.id
        const postId = req.params.postId
        const { title, content } = req.body
        const post = await Post.findOneAndUpdate({ author: userId, _id: postId }, { title: title, content: content }, { new: true })
        if (!post) {
            res.status(400).json({
                message: "Post Not Found"
            })
        }
        else {
            res.status(200).json({
                message: "Posts Updated Succesfully",
                post: post
            })
        }
    }

    catch(err){
        res.status(400).json({
            message: "Error Deleting Post"
        })
    }
    // const userId = req.user.id
    // const postId = req.params.postId
    // const { title, content } = req.body

    // Post.findOneAndUpdate({ author: userId, _id: postId }, { title: title, content: content }, { new: true }).then(post => {
    //     if (!post) {
    //         res.status(400).json({
    //             message: "Post Not Found"
    //         })
    //     }
    //     else {
    //         res.status(200).json({
    //             message: "Posts Updated Succesfully",
    //             post: post
    //         })
    //     }
    // })
    //     .catch(err => {
    //         res.status(400).json({
    //             message: "Error Deleting Post"
    //         })
    //     })
}