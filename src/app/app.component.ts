import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { Person } from './shared/interfaces/person';
import { EventBindExampleComponent } from './components/event-bind-example/event-bind-example.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PersonTableComponent, EventBindExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = "Nikos";

  // Step 1: One way of binding data
  person = {
    givenName: "Nikos",
    surname: "Michos",
    age: 35,
    email: "nik@yahoo.gr"
  }

  //Step 3: Component Input
  person0: Person = {
    givenName: "Christodoulos",
    surName: "Fragkoudakis",
    age: 55,
    email: "chrisfrag@aueb.gr",
    address: "Athens, Greece",
  }

  person1: Person = {
    givenName: "John",
    surName: "Doe",
    age: 40,
    email: "jodo@aueb.gr",
    address: 'Volos, Greece'
  }

  users: Person[] = [{
    "givenName": "Elroy",
    "surName": "Ayliff",
    "email": "eayliff0@cbslocal.com",
    "age": 1,
    "address": "Jeju-si"
  }, {
    "givenName": "Renata",
    "surName": "Jee",
    "email": "rjee1@fda.gov",
    "age": 2,
    "address": "Yanahuaya"
  }, {
    "givenName": "Hunt",
    "surName": "Pennell",
    "email": "hpennell2@rediff.com",
    "age": 3,
    "address": "Presidente Bernardes"
  }, {
    "givenName": "Susan",
    "surName": "Elvey",
    "email": "selvey3@noaa.gov",
    "age": 4,
    "address": "Balzan"
  }, {
    "givenName": "Layne",
    "surName": "Martello",
    "email": "lmartello4@bbc.co.uk",
    "age": 5,
    "address": "Yongheshi"
  }, {
    "givenName": "Wendell",
    "surName": "Mortlock",
    "email": "wmortlock5@columbia.edu",
    "age": 6,
    "address": "Caldas da Rainha"
  }, {
    "givenName": "Samara",
    "surName": "Mc Gee",
    "email": "smcgee6@csmonitor.com",
    "age": 7,
    "address": "Dzerzhinsk"
  }, {
    "givenName": "Sig",
    "surName": "McKelloch",
    "email": "smckelloch7@geocities.jp",
    "age": 8,
    "address": "Évry"
  }, {
    "givenName": "Lonnie",
    "surName": "Akram",
    "email": "lakram8@mediafire.com",
    "age": 9,
    "address": "Alcanhões"
  }, {
    "givenName": "Adriaens",
    "surName": "Gavini",
    "email": "agavini9@vkontakte.ru",
    "age": 10,
    "address": "Nova Odesa"
  }, {
    "givenName": "Rosy",
    "surName": "Bradnam",
    "email": "rbradnama@uiuc.edu",
    "age": 11,
    "address": "Masingbi"
  }, {
    "givenName": "Babbette",
    "surName": "Zorzutti",
    "email": "bzorzuttib@de.vu",
    "age": 12,
    "address": "Pasargunung"
  }, {
    "givenName": "Peterus",
    "surName": "Horry",
    "email": "phorryc@nba.com",
    "age": 13,
    "address": "Portalegre"
  }, {
    "givenName": "Trudey",
    "surName": "Standbridge",
    "email": "tstandbridged@naver.com",
    "age": 14,
    "address": "Mranggen"
  }, {
    "givenName": "Teodoor",
    "surName": "McInerney",
    "email": "tmcinerneye@jimdo.com",
    "age": 15,
    "address": "Bagou"
  }, {
    "givenName": "Timothy",
    "surName": "Kelley",
    "email": "tkelleyf@cisco.com",
    "age": 16,
    "address": "Niutian"
  }, {
    "givenName": "Nikolos",
    "surName": "Chatteris",
    "email": "nchatterisg@hud.gov",
    "age": 17,
    "address": "Tanenofunan"
  }, {
    "givenName": "Nicolas",
    "surName": "Florence",
    "email": "nflorenceh@smugmug.com",
    "age": 18,
    "address": "Xucheng"
  }, {
    "givenName": "Kilian",
    "surName": "Pearle",
    "email": "kpearlei@1und1.de",
    "age": 19,
    "address": "Guzhuyingzi"
  }, {
    "givenName": "Muire",
    "surName": "Waters",
    "email": "mwatersj@yolasite.com",
    "age": 20,
    "address": "Gongchenqiao"
  }]
}
