import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-user-registration',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService)
  
  form = new FormGroup({
    username: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    // address is an object in the interface user
    address: new FormGroup({
      area: new FormControl(""),
      road: new FormControl("")
    }),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(4)])
  },
  this.passwordConfirmValidator,
  );

  passwordConfirmValidator(control: AbstractControl): {[key:string]: boolean} | null {
    const form = control as FormGroup;
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    
    if(password && confirmPassword && password !== confirmPassword) {
      form.get("confirmPassword")?.setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }

    return null;
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
  }

  check_duplicate_email() {
    const email = this.form.get("email")?.value;
    
    if(email) {
      this.userService.check_duplicate_email(email).subscribe({
        next: (response) => {
          console.log(response)
          this.form.get("email")?.setErrors(null)
        },
        error: (response) => {
          console.log(response);
          const message = response.data;
          console.log(message);
          this.form.get("email")?.setErrors({duplicateEmail: true})
        }
      })
    }
  }
}
