export interface Resenas {
    _id?: string;
    numero_documento: number;
    titulo_Libro: string;
    calificacion: number;
    comentario: string;
    fecha: string;
    estado: string;
  }
  
  export interface ApiResena {
      result: string;
      message: string;
      data: Resenas[];
  }
  