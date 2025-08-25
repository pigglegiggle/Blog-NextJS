import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, content, authorId } = req.body;
        if ( !title || !content || !authorId  ) {
            return res.status(400).json({message: 'Please fill all input!', success: false});
        }

        try {

            const newBlog = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: parseInt(authorId),
                },
            });
            return res.status(201).json({message: 'Post created successfully', success: true , blog: newBlog});
        } catch (error) {
            console.log('Error registering:', error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}