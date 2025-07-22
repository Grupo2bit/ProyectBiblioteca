export interface Libros {
    _id?: string;
    titulo: string;
    autor: string;
    categoria: string;
    ano_publicacion: number;
    disponible: boolean; // defaul: true está disponible a menos que se diga lo contrario.
    ejemplares: number;
    imagen: String;

}

export interface ApiLibros {
    result: string;
    message: string;
    data: Libros[];
}