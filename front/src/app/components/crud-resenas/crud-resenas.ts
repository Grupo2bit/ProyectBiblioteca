import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResenasS } from '../../services/resenas-s';
import { Resenas } from '../../interfaces/resenas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-resenas',
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-resenas.html',
  styleUrl: './crud-resenas.css'
})
export class CrudResenas implements OnInit {
  resenas: Resenas[] = [];
  imagenBaseUrl = 'http://localhost:3000/imagenes/';
  mostrarFormulario = false;
  resenaForm: Resenas= this.resetResena();
  
  modo: 'crear' | 'editar' = 'crear';
  
  constructor(private resenasService:ResenasS,
    private cdr:ChangeDetectorRef
  ){}
  
  // metodo para cargar las resenas en la tabla
  obtenerResenas():void{
    this.resenasService.getAll().subscribe({
      next:(resp)=>{
        this.resenas=resp;
        this.cdr.detectChanges();
      },
      error:(err)=>console.error("Error al cargar las resenas", err)
    });
  }
  ngOnInit(): void {
    this.obtenerResenas();
  }
  
  //metodo previo para poder cargar el metodo de crear Resena
  
  selectedFile! : File;
  
  onFileSelected(event:any):void{
    const file: File = event.target.file[0];
    if(file){
      this.selectedFile = file;
    }
  }
  
  // metodo para crear producto
  
  crearResena():void{
    if(!this.selectedFile){
      alert("Por favor selecciona una imagen");
      return;
    }
    const formData = new FormData();
    formData.append('numero_documento', this.resenaForm.numero_documento.toString());
    formData.append('titulo_libro',this.resenaForm.titulo_Libro);
    formData.append('calificacion', this.resenaForm.calificacion.toString());
    formData.append('comentario', this.resenaForm.comentario);
    formData.append('fecha', this.resenaForm.fecha.toString());
    formData.append('estado', this.resenaForm.estado);
    formData.append('imagen', this.selectedFile);
  
    this.resenasService.crear(formData).subscribe({
      next:()=>{
        alert('Reseña creada correctamente');
        this.resenaForm = this.resetResena();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerResenas();
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error("Error al cargar las resenas", err);
        alert('Error al cargar las resenas');
      }
    });
  }
  // metodo previo al metodo para actualizar
  
  resetResena():Resenas{
    return{
      numero_documento:0,
      titulo_Libro:'',
      calificacion:0,
      comentario: '',
      fecha:'',
      estado:'',
    };
  }
  
  seleccionarParaEditar(resena:Resenas):void{
    this.modo = 'editar';
    this.resenaForm = {...resena};
    this.mostrarFormulario = true;
  }
  prepararCrear():void{
    this.modo='crear';
    this.resenaForm = this.resetResena();
    this.mostrarFormulario = true;
  }
  
  cancelarFormulario():void{
    this.mostrarFormulario = false;
  }
  
  // metodo para actualizar
  actualizarResena():void{
    if(!this.resenaForm._id){
      alert('No se encontro el ID de la resena');
      return;
    }
  // previo de los datos que espero recibir
    const formData = new FormData();
    formData.append('numero_documento', this.resenaForm.numero_documento.toString());
    formData.append('titulo_libro',this.resenaForm.titulo_Libro);
    formData.append('calificacion', this.resenaForm.calificacion.toString());
    formData.append('comentario', this.resenaForm.comentario);
    formData.append('fecha', this.resenaForm.fecha.toString());
    formData.append('estado', this.resenaForm.estado);
    formData.append('imagen', this.selectedFile);
  
    //solo agregamos nueva imagen si selecciono alguna
    if(this.selectedFile){
      formData.append('imagen', this.selectedFile);
    }
    this.resenasService.actualizar(this.resenaForm._id,formData).subscribe({
      next:()=>{
        alert("Producto actualizado correctamente");
        this.obtenerResenas();
        this.resenaForm = this.resetResena();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerResenas();
        this.cdr.detectChanges();
  
      },
      error:(err)=>{
        console.log("Error al actualizar la resena");
        alert("Error al actualizar la resena")
      }
    });
  }
  
  //metodo para eliminar producto
  
  eliminarResena(id:string):void{
    if(confirm("Estas seguro de eliminar la resena?")){
      this.resenasService.delete(id).subscribe({
        next:(resp)=>{
          alert("Resena eliminado exitosamente");
          this.resenas = resp;
          this.obtenerResenas();
          this.cdr.detectChanges();
        },
        error:(err)=> console.error("Error al eliminar", err)
      });
    }
  }
}