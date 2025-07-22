export interface Multa {
  _id?: string;
  numero_documento: string;
  titulo_libro: string;
  monto: number;
  fecha_Prestamo: string;      
  fecha_devolucion: string;
  fecha_Limite_Pago: string;
  estado: 'pendiente' | 'pagada';
}

export interface ApiMultas {
  result: string;
  message: string;
  data: Multa[];
}
