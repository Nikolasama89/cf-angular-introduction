import { Component } from '@angular/core';
import { EPerson, ManyPerson } from 'src/app/shared/interfaces/eperson';
import { SimpleDatatableComponent } from '../simple-datatable/simple-datatable.component';

@Component({
  selector: 'app-component-output-example',
  imports: [SimpleDatatableComponent],
  templateUrl: './component-output-example.component.html',
  styleUrl: './component-output-example.component.css'
})
export class ComponentOutputExampleComponent {
  manyPerson = ManyPerson;

  showPersonClicked(person: EPerson) {
    console.log("Component Output ", person);
    alert(this.personTemplate(person))
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
