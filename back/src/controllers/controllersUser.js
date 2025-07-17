import Usuario from "../models/modelUser.js";
import bcrypt from "bcryptjs";


// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    console.log('Password recibido:', req.body.password);
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

    // Si se envía una nueva contraseña, la encriptamos
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
export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
  loginUser
};

