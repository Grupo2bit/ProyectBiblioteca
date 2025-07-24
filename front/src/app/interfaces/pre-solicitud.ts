export interface PreSolicitud {
  _id?: string;                    
  numero_documento: string;      
  titulo_libro: string;           
  fecha_solicitud: string;       
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';  
  comentario?: string;        
  fecha_devolucion?: string;  
  procesado_por?: string;        
}

export interface ApiPreSolicitudes {
  result: string;
  message: string;
  data: PreSolicitud[];
}

