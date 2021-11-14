import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  currentWeather!: ICurrentWeather;

  constructor(private weatherService:WeatherService) {
   }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather("rawalpindi").subscribe(res=>{
      this.currentWeather=res;
    })
  }

}
