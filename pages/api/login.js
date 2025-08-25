import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = 'your_jwt_secret';

export default async function handler(req, res) {
    if ( req.method === 'POST' ) {
        const { emailOrName, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrName },
                    { name: emailOrName },
                ],
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, message: 'Login Successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}