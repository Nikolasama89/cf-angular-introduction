import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';



@Component({
  selector: 'app-user-registration',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService)

  registrationStatus: {success: boolean, message: string} = {
    //Initial Value
    success: false,
    message: "Not attempted yet"
  }
  
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
    // Οταν εχουμε Array στο interface
    phone: new FormArray([
      new FormGroup({
        number: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required)
      })
    ]),
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

  // Για προσθεση αφαιρεση αριθμου τηλεφωνου
  phone = this.form.get("phone") as FormArray;

  addPhoneNumber() {
    this.phone.push(
      new FormGroup({
        number: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required)
      })
    )
  }

  removePhoneNumber(index: number) {
    this.phone.removeAt(index);
  }

  onSubmit() {
    // Η ΦΟΡΜΑ ΘΑ ΣΤΕΙΛΕΙ ΚΑΙ ΤΟ CONFIRM PASSWORD
    // Στελνει ολα τα inputs απο την φορμα
    const data = this.form.value as User;
    
    // const data: User = {
    //   "username": this.form.get("username")?.value || "",
    //   "password": this.form.get("password")?.value || "",
    //   "name": this.form.get("name")?.value || "",
    //   "surname": this.form.get("surname")?.value || "",
    //   "email": this.form.get("email")?.value || "",
    //   "address": {
    //     "area": this.form.controls.address.controls.area?.value || "",
    //     "road": this.form.controls.address.controls.road?.value || "",
    //   }
    // }
    console.log(data);
    this.userService.registerUser(data).subscribe({
      next: (response) => {
        console.log("User Saved", response);
        this.registrationStatus = {success: true, message: "User Registered"}
      },
      error: (response) => {
        console.log("User not Saved", response);  
        this.registrationStatus = {success: false, message: response.data}
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

  registerAnother() {
    this.form.reset()
    this.registrationStatus = {success: false, message: "Not Attempted yet"}
  }
}
