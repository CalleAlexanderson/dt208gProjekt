# Dt208gProjekt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Mitt arbete

Jag har skapat en webbsida med hjälp av Angular 17, webbsidan består av tre undersidor och två services. 

Första undersidan (UCB) har information och instruktioner till de olika funktionerna på de andra undersidorna, andra undersidan (kurser) visar de olika kurser som finns på (det fiktiva) universitetet UCB och tredje undersidan är ett ramschema som det går att lägga till kurser på. 

Ena servicen hämtar kurserna från nätet i en json fil och kan undersidorna hämta de kurser med hjälp av observables,  andra servicen hämtar data från locastorage och konverterar det till en array som sedan går att använda på undersidorna för att se vilka kurser som är sparade i ramschemat. 

På undersida två kan användaren filtrera kurserna med hjälp av en sökfunktion och ett ämnes filter och hen kan också sortera kurserna i bokstavsordning samt lägga till kurser på ramschemat med en knapp. På undersida tre kan användaren sen använda en knapp i samma position för att ta bort kurser från ramschemat.
