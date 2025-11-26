import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  form = { email: '', password: '', isAdmin: false };
  error = '';

  constructor(private api: ApiService, private router: Router) {}

login() {
  this.api.login(this.form).subscribe({
    next: (res) => {

      
      if (res.status !== 'Approved') {
        this.error = 'User not approved yet';
        return;
      }

      
      localStorage.setItem('user', JSON.stringify(res));

      
      if (res.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    },
    error: (err) => {
      this.error = err.error?.error || 'Login failed';
    }
  });
}


}
