import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {

        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            });
    
            return res.status(200).json({ posts })
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({ message: 'Error fetching posts', success: false });
        } 

    }  else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
