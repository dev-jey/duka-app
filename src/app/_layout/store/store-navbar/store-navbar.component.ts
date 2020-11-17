import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-navbar',
  templateUrl: './store-navbar.component.html',
  styleUrls: ['./store-navbar.component.scss']
})
export class StoreNavbarComponent implements OnInit {
  name:String="James"
  constructor() { }

  ngOnInit(): void {
  }

}
