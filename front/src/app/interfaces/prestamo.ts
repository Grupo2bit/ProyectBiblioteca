export interface Prestamo {
  _id?: string;
  numero_documento: string;
  titulo_libro: string;
  fecha_prestamo: string;
  fecha_devolucion?: string;
  fecha_entrega?: string;
  estado: 'pendiente' | 'prestado' | 'devuelto' | 'retrasado';
}


export interface ApiPrestamos {
  result: string;
  message: string;
  data: Prestamo[];
}