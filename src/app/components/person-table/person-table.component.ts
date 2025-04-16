import { Component } from '@angular/core';

@Component({
  selector: 'app-person-table',
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  name = "Margie"

  person = {
    givenName: "Margie",
    surname: "Dmtk",
    age: 33,
    email: "margie@aueb.gr"
  }
}
