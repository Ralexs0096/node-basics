import db from '../config/database.js'; 

const errorMessage = { message: 'Something went wrong on the server.' };
const notFoundMessage = { message: 'Post not found.' };

export const getAllPosts = async (_, res) => {
    try {
        const posts = await db('posts')
            .join('users', 'posts.user_id', '=', 'users.id')
            .select(
                'posts.id',
                'posts.title',
                'posts.created_at',
                'posts.user_id',
                'users.username as authorUsername' 
            )
            .orderBy('posts.created_at', 'desc');

        res.status(200).json({
            message: 'Posts retrieved successfully',
            data: { posts },
            success: true
        });
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    try {
        const post = await db('posts')
            .join('users', 'posts.user_id', '=', 'users.id')
            .select(
                'posts.id',
                'posts.title',
                'posts.content', 
                'posts.created_at',
                'posts.user_id',
                'users.username as authorUsername'
            )
            .where('posts.id', id)
            .first();

        if (!post) {
            return res.status(404).json({ ...notFoundMessage, success: false });
        }
        res.status(200).json({
            message: 'Post retrieved successfully',
            data: { post },
            success: true
        });
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};



export const createPost = async (req, res) => {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
        return res.status(400).json({ message: 'Title, content, and user_id are required.', success: false });
    }
     if (!/^\d+$/.test(user_id) || parseInt(user_id, 10) <= 0) { 
        return res.status(400).json({ message: 'Invalid user_id format.', success: false });
    }

    try {
        const userExists = await db('users').where({ id: user_id }).first();
        if (!userExists) {
             return res.status(400).json({ message: 'Author user not found.', success: false });
        }

        const newPost = { title, content, user_id };
        const [insertedId] = await db('posts').insert(newPost);

        const createdPost = await db('posts').where({ id: insertedId }).first(); 

        res.status(201).json({
            message: 'Post created successfully',
            data: { post: createdPost },
            success: true
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.', success: false });
    }

    try {

        const affectedRows = await db('posts').where({ id }).update(updateData);

        if (affectedRows === 0) {
             const postExists = await db('posts').where({id}).first();
             return res.status(postExists ? 200 : 404).json({ message: postExists ? 'Post updated successfully (no change detected).' : 'Post not found.', success: postExists });
        }

        const updatedPost = await db('posts').where({ id }).first(); 

        res.status(200).json({
            message: 'Post updated successfully',
            data: { post: updatedPost },
            success: true
        });
    } catch (error) {
        console.error(`Error updating post ${id}:`, error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};



export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    try {


        const affectedRows = await db('posts').where({ id }).del();

        if (affectedRows === 0) {
            return res.status(404).json({ ...notFoundMessage, success: false });
        }
        res.status(204).send(); 

    } catch (error) {
        console.error(`Error deleting post ${id}:`, error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};