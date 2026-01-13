import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    username: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginData.username && this.loginData.password) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error || 'Invalid username or password';
        }
      });
    }
  }
}
