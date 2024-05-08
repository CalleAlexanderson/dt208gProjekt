import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ngOnInit():void{
    let link = document.getElementsByClassName('navLinks') as HTMLCollectionOf<HTMLLinkElement>;
    for (let index = 0; index < link.length; index++) {
      link[index].classList.remove("currentSite");
    }
    link[0].classList.add("currentSite");
  }
}
