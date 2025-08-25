import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req, res) {
    const { query: {id} } = req;

    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id, 10) },
            });
            if ( !user ) {
                return res.status(404).json({message: 'User not found!'});
            }
            return res.status(200).json({
                user: user, 
                message: 'Retrieved user successfully', 
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ 
                message: 'Internal server error' 
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}