import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { EPerson } from 'src/app/shared/interfaces/eperson';
import {sortBy} from "lodash-es";
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-simple-datatable',
  imports: [],
  templateUrl: './simple-datatable.component.html',
  styleUrl: './simple-datatable.component.css'
})
export class SimpleDatatableComponent {
  @Input() data: EPerson[] | undefined;
  @Output() personClicked = new EventEmitter<EPerson>()
  
  personService = inject(PersonService)
  epersonsData: EPerson[] | undefined = [];

  constructor() {
    effect(()=> {
      if(this.personService.modifiedDateTable()) {
        console.log("Signal ", this.data)
        this.epersonsData = this.data
      }
      this.personService.modifiedDateTable.set(false);
    })
  }
  
  sortOrder = {
    givenName: "none",
    surName: "none",
    age: "none",
    email: "none",
    education: "none"
  }

  sortData(sortKey: keyof EPerson): void {
    console.log(sortKey);
    this.epersonsData = this.data
    if (this.sortOrder[sortKey] === "asc") {
      this.sortOrder[sortKey] ="desc"
      this.epersonsData = sortBy(this.data, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = "asc";
      this.epersonsData = sortBy(this.data, sortKey)
    }
    
    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key as keyof EPerson] = "none"
      }
    }
    console.log(this.sortOrder)
  }

  onPersonClicked(person: EPerson) {
    console.log("Person>>>> ", person);
    this.personClicked.emit(person);
  }

  sortSign(sortKey: keyof EPerson): string {
    if (this.sortOrder[sortKey] === "asc") return "\u2191"
    else if (this.sortOrder[sortKey] === "desc") return "\u2193"
    else return "";
  }
}
