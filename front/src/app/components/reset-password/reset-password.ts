import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:3000/api/usuarios/reset-password', {
      token: this.token,
      password: this.form.value.password
    }).subscribe({
      next: () => {
        alert('Contraseña actualizada exitosamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        alert(err.error?.mensaje || 'Error al actualizar contraseña');
      }
    });
  }
}
