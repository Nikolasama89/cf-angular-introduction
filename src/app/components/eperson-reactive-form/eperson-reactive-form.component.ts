import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { EPerson } from 'src/app/shared/interfaces/eperson';



@Component({
  selector: 'app-eperson-reactive-form',
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './eperson-reactive-form.component.html',
  styleUrl: './eperson-reactive-form.component.css'
})
export class EpersonReactiveFormComponent {
  @Output() person = new EventEmitter<EPerson>();

  // 1ος τροπος (most common)
  // το form ειναι δικο μας ονομα θα μπορουσε να ειναι το οτιδηποτε
  form = new FormGroup({
    // στην παρενθεση βαζουμε αν θελουμε καποιο default value
    givenName: new FormControl("", Validators.required),
    // AN εχουμε πολλους Validators τους βαζουμε σε πινακα
    surName: new FormControl("", Validators.required),
    age: new FormControl(18, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.min(18),
      Validators.max(100)
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    education: new FormControl("", Validators.required)
  })

  // 2os Τρόπος
  // form = new FormGroup<{
  //   givenName: FormControl<string>,
  //   surName: FormControl<string>,
  //   email: FormControl<string>,
  //   age: FormControl<number>,
  //   education: FormControl<string>,
  // }>({
  //   givenName: new FormControl("", {nonNullable:true, validators: Validators.required}),
  //   surName: new FormControl("", {nonNullable:true, validators: Validators.required}),
  //   email: new FormControl("", {nonNullable:true, validators: Validators.required}),
  //   age: new FormControl("", {nonNullable:true, validators: [Validators.min(18), Validators.max(100)]}),
  //   education: new FormControl("", {nonNullable:true, validators: Validators.required}),

  // })

  onSubmit() {
    if(this.form.valid) {
      console.log(this.form.value)
      const person: EPerson = {
        givenName: this.form.value.givenName ?? "",
        surName: this.form.value.surName ?? "",
        email: this.form.value.email ?? "",
        age: String(this.form.value.age) ?? "",
        education: this.form.value.education ?? ""
      }
      this.person.emit(person);
      this.form.reset();
    }

    // console.log("Data: ", data)
    // console.log("givenName>>>", this.form.controls["givenName"].value);
    // this.form.controls["surName"].setValue("Papakis");
    
  }

  onSetValue() {
    this.form.setValue({
      givenName: "Kostas",
      surName: "Lalakis",
      age: 39,
      email: "kostas@aueb.gr",
      education: "Bachelor degree"
    })
  }
}
