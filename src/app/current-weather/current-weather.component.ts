import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit,OnDestroy {

  currentWeather$: Observable<ICurrentWeather>;
  constructor(private weatherService:WeatherService) {
    this.currentWeather$=this.weatherService.currentWeather$;
   }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
