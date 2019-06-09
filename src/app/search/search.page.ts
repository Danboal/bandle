import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  bandTabSelectedClass: boolean = false;
  soloTabSelectedClass: boolean = false;
  constructor() { }

  ngOnInit() {
    this.bandTabSelectedClass = true;
    this.soloTabSelectedClass = false;
    document.getElementById("ion-footer").style.display = 'contents';
  }
  bandTab(){
    this.bandTabSelectedClass = true;
    this.soloTabSelectedClass = false;
  }
  soloTab(){
    this.bandTabSelectedClass = false;
    this.soloTabSelectedClass = true;
  }
}
