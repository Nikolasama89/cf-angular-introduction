import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  modifiedDateTable = signal<boolean>(false)
}
