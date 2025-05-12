import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';



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
    // Η ΦΟΡΜΑ ΘΑ ΣΤΕΙΛΕΙ ΚΑΙ ΤΟ CONFIRM PASSWORD
    // const data = this.form.value as User;
    const data: User = {
      "username": this.form.get("username")?.value || "",
      "password": this.form.get("password")?.value || "",
      "name": this.form.get("name")?.value || "",
      "surname": this.form.get("surname")?.value || "",
      "email": this.form.get("email")?.value || "",
      "address": {
        "area": this.form.get("area")?.value || "",
        "road": this.form.get("road")?.value || "",
      }
    }
    console.log(data);
    this.userService.registerUser(data).subscribe({
      next: (response) => {
        console.log("User Saved", response);
      },
      error: (response) => {
        console.log("User not Saved", response);  
      }
    })
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
