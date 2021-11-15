import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  search: FormControl;
  constructor(private weatherService: WeatherService) {
    this.search = new FormControl('',Validators.minLength(2));
  }

  ngOnInit(): void {
    //this.search=new FormControl("search");
    this.search.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((searchValue: string) => {
      if(this.search.valid){
        this.weatherService.updateCurrentWeather(searchValue)
      }
      
    })
  }

}
