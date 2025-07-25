export interface Notificaciones {
  _id?: string;
  numero_documento: string;
  tipo: 'recordatorio' | 'multa' | 'prestamo' | 'mensaje_admin';
  contenido: string;
  fecha_envio: string;   
  estado: 'no_leida' | 'leida';
}

export interface ApiNotificaciones {
  result: string;
  message: string;
  data: Notificaciones[];
}
