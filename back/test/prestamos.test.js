import request from 'supertest';
import servidor from '../src/servidor.js';

let mockSave = jest.fn();

jest.mock('../src/models/modelPrestamos.js', () => {
  const MockPrestamoModel = jest.fn().mockImplementation((data) => ({
    ...data,
    save: mockSave, // Assign the shared mockSave function
  }));

  MockPrestamoModel.findById = jest.fn();
  MockPrestamoModel.find = jest.fn();
  MockPrestamoModel.findByIdAndUpdate = jest.fn();
  MockPrestamoModel.findByIdAndDelete = jest.fn();

  return {
    __esModule: true,
    default: MockPrestamoModel,
  };
});

import modelPrestamos from '../src/models/modelPrestamos.js';

// Now, `modelPrestamos` is the mock constructor itself.
const mockModelPrestamos = modelPrestamos; // No .default needed as we're importing the default export

describe('Prestamos API', () => {
  beforeEach(() => {
    // Limpia todas las llamadas a los mocks y resetea sus implementaciones para un estado limpio.
    jest.clearAllMocks();
    // Reset the implementation of mockSave for each test
    mockSave.mockResolvedValue({ _id: 'mockId' }); // Default resolved value for save
  });

  // Esto es para asegurar que Supertest no mantenga el servidor abierto después de todas las pruebas.
  afterAll(() => {
    if (servidor && typeof servidor.close === 'function') {
      servidor.close();
    }
  });

  describe('POST /prestamos', () => {
    it('debería crear un préstamo exitosamente', async () => {
      const newPrestamo = {
        numero_documento: '12345',
        titulo_libro: 'El Principito',
        fecha_prestamo: '2023-01-01',
        fecha_devolucion: '2023-01-15',
        fecha_entrega: null,
        estado: 'prestado',
      };
      const createdPrestamo = { _id: 'someId', ...newPrestamo };

      // Configura el mock del método `save` del prototipo para devolver un valor resuelto.
      mockSave.mockResolvedValue(createdPrestamo);

      const response = await request(servidor)
        .post('/prestamos')
        .send(newPrestamo)
        .expect(200);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({
        result: 'fine',
        message: 'Prestamo Creado',
        data: 'someId',
      });
    });

    it('debería manejar errores al crear un préstamo', async () => {
      const newPrestamo = {
        numero_documento: '12345',
        titulo_libro: 'El Principito',
        fecha_prestamo: '2023-01-01',
        fecha_devolucion: '2023-01-15',
        fecha_entrega: null,
        estado: 'prestado',
      };
      const error = new Error('Error de base de datos');

      mockSave.mockRejectedValue(error);

      const response = await request(servidor)
        .post('/prestamos')
        .send(newPrestamo)
        .expect(200); // El controlador devuelve 200 incluso si hay un error en el try-catch

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({
        result: 'mistake',
        message: 'A ocurrido un error mientras se crea el Prestamo',
        data: expect.any(Object), // Espera un objeto de error, no la instancia completa de Error
      });
    });
  });

  describe('GET /prestamos', () => {
    it('debería devolver todos los préstamos exitosamente', async () => {
      const prestamos = [{ _id: 'id1', titulo_libro: 'Libro 1' }, { _id: 'id2', titulo_libro: 'Libro 2' }];
      mockModelPrestamos.find.mockResolvedValue(prestamos);

      const response = await request(servidor)
        .get('/prestamos')
        .expect(200);

      expect(mockModelPrestamos.find).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({
        result: 'fine',
        message: 'Prestamos Encontrado',
        data: prestamos,
      });
    });

    it('debería manejar errores al leer todos los préstamos', async () => {
      const error = new Error('Error de base de datos');
      mockModelPrestamos.find.mockRejectedValue(error);

      const response = await request(servidor)
        .get('/prestamos')
        .expect(200);

      expect(mockModelPrestamos.find).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({
        result: 'mistake',
        message: 'A ocurrido un error mientras se lee los Prestamos',
        data: expect.any(Object),
      });
    });
  });

  describe('GET /prestamos/:id', () => {
    it('debería devolver un préstamo exitosamente', async () => {
      const prestamoId = 'someId';
      const prestamo = { _id: prestamoId, titulo_libro: 'Libro de Prueba' };
      mockModelPrestamos.findById.mockResolvedValue(prestamo);

      const response = await request(servidor)
        .get(`/prestamos/${prestamoId}`)
        .expect(200);

      expect(mockModelPrestamos.findById).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findById).toHaveBeenCalledWith(prestamoId);
      expect(response.body).toEqual({
        result: 'fine',
        message: 'Prestamo Encontrado',
        data: prestamo,
      });
    });

    it('debería manejar el caso donde no se encuentra el préstamo', async () => {
      const prestamoId = 'nonExistentId';
      mockModelPrestamos.findById.mockResolvedValue(null);

      const response = await request(servidor)
        .get(`/prestamos/${prestamoId}`)
        .expect(200);

      expect(mockModelPrestamos.findById).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findById).toHaveBeenCalledWith(prestamoId);
      expect(response.body).toEqual({
        result: 'fine',
        message: 'Prestamo Encontrado',
        data: null,
      });
    });

    it('debería manejar errores al leer un préstamo', async () => {
      const prestamoId = 'someId';
      const error = new Error('Error de base de datos');
      mockModelPrestamos.findById.mockRejectedValue(error);

      const response = await request(servidor)
        .get(`/prestamos/${prestamoId}`)
        .expect(200);

      expect(mockModelPrestamos.findById).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findById).toHaveBeenCalledWith(prestamoId);
      expect(response.body).toEqual({
        result: 'mistake',
        message: 'A ocurrido un error mientras se lee el Prestamo',
        data: expect.any(Object),
      });
    });
  });

  describe('PUT /prestamos/:id', () => {
    it('debería actualizar un préstamo exitosamente', async () => {
      const prestamoId = 'someId';
      const updateData = { estado: 'devuelto' };
      const updatedPrestamo = { _id: prestamoId, ...updateData };
      mockModelPrestamos.findByIdAndUpdate.mockResolvedValue(updatedPrestamo);

      const response = await request(servidor)
        .put(`/prestamos/${prestamoId}`)
        .send(updateData)
        .expect(200);

      expect(mockModelPrestamos.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findByIdAndUpdate).toHaveBeenCalledWith(prestamoId, updateData);
      expect(response.body).toEqual({
        resul: 'fine', // Hay un typo en el controlador: 'resul' en lugar de 'result'
        message: 'Prestamo Actualizado',
        data: prestamoId,
      });
    });

    it('debería manejar errores al actualizar un préstamo', async () => {
      const prestamoId = 'someId';
      const updateData = { estado: 'devuelto' };
      const error = new Error('Error de base de datos');
      mockModelPrestamos.findByIdAndUpdate.mockRejectedValue(error);

      const response = await request(servidor)
        .put(`/prestamos/${prestamoId}`)
        .send(updateData)
        .expect(200);

      expect(mockModelPrestamos.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findByIdAndUpdate).toHaveBeenCalledWith(prestamoId, updateData);
      expect(response.body).toEqual({
        result: 'mistake',
        message: 'A ocurrido un error mientras se actualiza Prestamo',
        data: expect.any(Object),
      });
    });
  });

  describe('DELETE /prestamos/:id', () => {
    it('debería eliminar un préstamo exitosamente', async () => {
      const prestamoId = 'someId';
      mockModelPrestamos.findByIdAndDelete.mockResolvedValue({ _id: prestamoId });

      const response = await request(servidor)
        .delete(`/prestamos/${prestamoId}`)
        .expect(200);

      expect(mockModelPrestamos.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findByIdAndDelete).toHaveBeenCalledWith(prestamoId);
      expect(response.body).toEqual({
        result: 'fine',
        message: 'Prestamo Eliminado',
        data: null,
      });
    });

    it('debería manejar errores al eliminar un préstamo', async () => {
      const prestamoId = 'someId';
      const error = new Error('Error de base de datos');
      mockModelPrestamos.findByIdAndDelete.mockRejectedValue(error);

      const response = await request(servidor)
        .delete(`/prestamos/${prestamoId}`)
        .expect(200);

      expect(mockModelPrestamos.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(mockModelPrestamos.findByIdAndDelete).toHaveBeenCalledWith(prestamoId);
      expect(response.body).toEqual({
        result: 'mistake',
        message: 'A ocurrido un error mientras se elimina Prestamo',
        data: expect.any(Object),
      });
    });
  });
});
