import Usuario from "../models/modelUser.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"; 
import crypto from "crypto";

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const nuevoUsuario = new Usuario({
      ...req.body,
      password: hashedPassword
    });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear usuario", error });
  }
};

// Obtener un usuario por ID
const readUser = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al buscar usuario", error });
  }
};

// Obtener todos los usuarios
const readAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar usuario", error });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar usuario", error });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Correo no registrado" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
};

// Recuperar contraseña con nodemailer
const recuperarPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Puedes generar un token real aquí
    const token = crypto.randomBytes(32).toString("hex");

    // Configuración del transporte
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grupo2biblioteca@gmail.com",      
        pass: "ukkbsnrkeqgplmwp"         
      }
    });

    const mailOptions = {
      from: "grupo2biblioteca@gmail.com",         
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Hola ${usuario.name || 'usuario'},</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="http://localhost:4200/reset-password/${token}">Recuperar contraseña</a>
        <p>Este enlace es válido por 1 hora.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ mensaje: "Correo de recuperación enviado" });

  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo", error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  // Aquí deberías verificar si el token es válido, por ejemplo buscarlo en la base de datos

  // 🔒 Esto es un ejemplo muy simple (debes mejorarlo con seguridad real)
  const usuario = await Usuario.findOne({ resetToken: token });

  if (!usuario) {
    return res.status(400).json({ mensaje: 'Token inválido o expirado' });
  }

  usuario.password = await bcrypt.hash(password, 10);
  usuario.resetToken = undefined; // Limpia el token
  await usuario.save();

  res.json({ mensaje: 'Contraseña restablecida correctamente' });
};


// Exportar controladores
export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  recuperarPassword,
  resetPassword
};

