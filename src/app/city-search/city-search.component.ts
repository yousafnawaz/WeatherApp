import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  search:FormControl;
  constructor() { 
    this.search=new FormControl("");
  }

  ngOnInit(): void {
    //this.search=new FormControl("search");
  }

}
