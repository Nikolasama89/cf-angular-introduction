import { Component, Inject, inject } from '@angular/core';
import { EPerson, ManyPerson } from 'src/app/shared/interfaces/eperson';
import { SimpleDatatableComponent } from '../simple-datatable/simple-datatable.component';
import { PersonTableComponent } from '../person-table/person-table.component';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule} from "@angular/cdk/dialog"

@Component({
  selector: 'app-component-output-example',
  imports: [SimpleDatatableComponent],
  templateUrl: './component-output-example.component.html',
  styleUrl: './component-output-example.component.css'
})
export class ComponentOutputExampleComponent {
  manyPerson = ManyPerson;
  dialog = inject(Dialog)

  // constructor(public dialog: Dialog)
  

  showPersonClicked(person: EPerson) {
    console.log("Component Output ", person);
    // alert(this.personTemplate(person))
    this.dialog.open(PersonDialogComponent, {
      data: person
    })
  }

  personTemplate(person: EPerson) {
    return `
    Person Details 

    First Name: ${person.givenName}
    Last Name: ${person.surName}
    Age : ${person.age}
    Email: ${person.email}
    Education: ${person.education}  
    `
  }

}

@Component({
  imports:[PersonTableComponent],
  template: 
  `
  <app-person-table [personInput]="person"></app-person-table>
  <button class="btn btn-primary btn-sm" (click)="dialogRef.close()">Close</button>
  `,
  styles: [
    `
    :host {
      display:block;
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      max-width: 500px;
      }
    `
  ]
})
export class PersonDialogComponent {
  dialogRef = inject(DialogRef);
  constructor(
    @Inject(DIALOG_DATA) public person: EPerson
  ){}
}
