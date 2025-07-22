import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LibroS } from '../../services/libro-s';
import { Libros } from '../../interfaces/libros';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-crud-libros',
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-libros.html',
  styleUrls: ['./crud-libros.css']
})
export class CrudLibros implements OnInit{
  libros: Libros[] = [];
imagenBaseUrl = 'http://localhost:3000/imagenes/';
mostrarFormulario = false;
libroForm: Libros= this.resetLibro();

modo: 'crear' | 'editar' = 'crear';

constructor(private librosService:LibroS,
  private cdr:ChangeDetectorRef
){}

// metodo para cargar los libros en la tabla
obtenerLibros():void{
  this.librosService.getAll().subscribe({
    next:(resp)=>{
      this.libros=resp;
      this.cdr.detectChanges();
    },
    error:(err)=>console.error("Error al cargar los libros", err)
  });
}
ngOnInit(): void {
  this.obtenerLibros();
}

//metodo previo para poder cargar el metodo de crear producto

selectedFile! : File;

onFileSelected(event:any):void{
  const file: File = event.target.file[0];
  if(file){
    this.selectedFile = file;
  }
}

// metodo para crear producto

crearLibro():void{
  if(!this.selectedFile){
    alert("Por favor selecciona una imagen");
    return;
  }
  const formData = new FormData();
  formData.append('titulo', this.libroForm.titulo);
  formData.append('autor', this.libroForm.autor);
  formData.append('categoria', this.libroForm.categoria);
  formData.append('ano_publicacion', this.libroForm.ano_publicacion.toString());
  formData.append('disponible', this.libroForm.disponible.toString());
  formData.append('ejemplares', this.libroForm.ejemplares.toString());
  formData.append('imagen', this.selectedFile);

  this.librosService.crear(formData).subscribe({
    next:()=>{
      alert('Producto creado correctamente');
      this.libroForm = this.resetLibro();
      this.selectedFile = undefined!;
      this.mostrarFormulario = false;
      this.obtenerLibros();
      this.cdr.detectChanges();
    },
    error:(err)=>{
      console.error("Error al cargar los libros", err);
      alert('Error al cargar los libros');
    }
  });
}
// metodo previo al metodo para actualizar

resetLibro():Libros{
  return{
    titulo:'',
    autor:'',
    categoria:'',
    ano_publicacion:0,
    disponible: true,
    ejemplares:1,
    imagen:'',
  };
}

seleccionarParaEditar(libro:Libros):void{
  this.modo = 'editar';
  this.libroForm = {...libro};
  this.mostrarFormulario = true;
}
prepararCrear():void{
  this.modo='crear';
  this.libroForm = this.resetLibro();
  this.mostrarFormulario = true;
}

cancelarFormulario():void{
  this.mostrarFormulario = false;
}

// metodo para actualizar
actualizarLibro():void{
  if(!this.libroForm._id){
    alert('No se encontro el ID del libro');
    return;
  }
// previo de los datos que espero recibir
  const formData = new FormData();
  formData.append('titulo', this.libroForm.titulo);
  formData.append('autor', this.libroForm.autor);
  formData.append('categoria', this.libroForm.categoria);
  formData.append('ano_publicacion', this.libroForm.ano_publicacion.toString());
  formData.append('disponible', this.libroForm.disponible.toString());
  formData.append('ejemplares', this.libroForm.ejemplares.toString());

  //solo agregamos nueva imagen si selecciono alguna
  if(this.selectedFile){
    formData.append('imagen', this.selectedFile);
  }
  this.librosService.actualizar(this.libroForm._id,formData).subscribe({
    next:()=>{
      alert("Libro actualizado correctamente");
      this.obtenerLibros();
      this.libroForm = this.resetLibro();
      this.selectedFile = undefined!;
      this.mostrarFormulario = false;
      this.obtenerLibros();
      this.cdr.detectChanges();

    },
    error:(err)=>{
      console.log("Error al actualizar el libro");
      alert("Error al actualizar el libro")
    }
  });
}

//metodo para eliminar libro

eliminarLibro(id:string):void{
  if(confirm("Estas seguro de eliminar el libro?")){
    this.librosService.delete(id).subscribe({
      next:(resp)=>{
        alert("Libro eliminado exitosamente");
        this.libros = resp;
        this.obtenerLibros();
        this.cdr.detectChanges();
      },
      error:(err)=> console.error("Error al eliminar", err)
    });
  }

}
}