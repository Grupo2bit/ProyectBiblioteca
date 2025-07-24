import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    
    this.form = this.fb.group({
      name: ['', Validators.required],
      type_document: ['Cédula', Validators.required],
      name_document: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['usuario', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

   this.http.post('http://localhost:3000/api/usuarios/register', this.form.value)
  .subscribe({
    next: () => {
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      alert(err.error?.message || 'Error en el registro');
    }
  });

  }
}