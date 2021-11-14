import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICurrentWeather } from './icurrent-weather';

interface ICurrentWeatherData { 
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient:HttpClient) { }

  getCurrentWeather(city:string):Observable<ICurrentWeather>{
    const params=new HttpParams()
    .set('q',city)
    .set('appid',environment.appId)
    return this.httpClient.get<ICurrentWeatherData>(`${environment.baseUrl}2.5/weather`,{params:params})
    .pipe(map(data=>
       this.transformWeatherData(data)
    ));
  }

  private transformWeatherData(data:ICurrentWeatherData):ICurrentWeather{
    return {
      city:data.name,
      country:data.sys.country,
      date:data.dt*1000,
      image:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature:this.convertKelvinToFahrenheit(data.main.temp),
      description:data.weather[0].description
    };
  }
  private convertKelvinToFahrenheit(kelvin: number): number
  { 
    return kelvin-273.15;
  }
}
