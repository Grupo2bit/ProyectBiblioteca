import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
})
export class ForgotPasswordComponent {
  form!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

 onSubmit() {
  if (this.form.invalid) return;

  this.http.post('http://localhost:3000/api/usuarios/recuperar', this.form.value)
    .subscribe({
      next: () => {
        alert('Revisa tu correo para restablecer tu contraseña');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.mensaje || 'Error al enviar el correo');
      }
    });
}

}
