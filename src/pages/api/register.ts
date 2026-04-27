import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, password, tipoPersona } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !password || !tipoPersona) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener mínimo 8 caracteres' });
  }

  try {
    // Verificar si el correo ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Este correo electrónico ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        tipoPersona,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      userId: user.id,
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
