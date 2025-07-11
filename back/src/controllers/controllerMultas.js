import modelMultas from '../models/modelsMultas.js';

const controllerMultas = {
  // Crear multa
  createMulta: async (sol, res) => {
    try {
      const {
        numero_documento,
        titulo_libro,
        monto,
        fecha_Prestamo,
        fecha_devolucion,
        fecha_Limite_Pago,
        estado
      } = sol.body;

      console.log(sol.body);

      const multa = new modelMultas({
        numero_documento,
        titulo_libro,
        monto,
        fecha_Prestamo,
        fecha_devolucion,
        fecha_Limite_Pago,
        estado: estado || 'pendiente'
      });

      const multaCreada = await multa.save();

      if (multaCreada._id) {
        res.json({
          result: 'fine',
          message: 'Multa creada exitosamente',
          data: multaCreada._id
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Ocurrió un error mientras se creaba la multa',
        data: error
      });
    }
  },

  // Leer una multa por ID
  readMulta: async (sol, res) => {
    try {
      const multaEncontrada = await modelMultas.findById(sol.params.id);
      res.json({
        result: 'fine',
        message: 'Multa encontrada',
        data: multaEncontrada
      });
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al leer la multa',
        data: error
      });
    }
  },

  // Leer todas las multas
  readMultas: async (sol, res) => {
    try {
      const multas = await modelMultas.find();
      res.json({
        result: 'fine',
        message: 'Multas encontradas',
        data: multas
      });
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al obtener las multas',
        data: error
      });
    }
  },

  // Actualizar multa
  updateMulta: async (sol, res) => {
    try {
      const multaActualizada = await modelMultas.findByIdAndUpdate(
        sol.params.id,
        sol.body,
        { new: true }
      );

      if (multaActualizada?._id) {
        res.json({
          result: 'fine',
          message: 'Multa actualizada correctamente',
          data: multaActualizada._id
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al actualizar la multa',
        data: error
      });
    }
  },

  // Eliminar multa
  deleteMulta: async (sol, res) => {
    try {
      const multaEliminada = await modelMultas.findByIdAndDelete(sol.params.id);

      if (multaEliminada?._id) {
        res.json({
          result: 'fine',
          message: 'Multa eliminada correctamente',
          data: null
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al eliminar la multa',
        data: error
      });
    }
  }
};

export default controllerMultas;