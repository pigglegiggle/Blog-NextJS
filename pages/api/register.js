import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password, repassword } = req.body;
        if ( !name || !email || !password || !repassword ) {
            return res.status(400).json({message: 'Please fill all input!', success: false});
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { name: name },
                ],
            },
        });

        if ( existingUser ) {
            return res.status(409).json({message: 'Username or Email already taken!', success: false});
        }
        if ( password !== repassword ) {
            return res.status(400).json({message: "Password doesn't match!", success: false})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            return res.status(201).json({message: 'Registered Successfully', success: true , user: newUser});
        } catch (error) {
            console.log('Error registering:', error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}