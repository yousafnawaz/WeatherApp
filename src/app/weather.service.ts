import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICurrentWeather } from './icurrent-weather';

export interface IWeatherService{
  readonly currentWeather$: BehaviorSubject<ICurrentWeather> 
  getCurrentWeather(city:string):Observable<ICurrentWeather>
  updateCurrentWeather(city:string):void
}
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
export class WeatherService implements IWeatherService{
  readonly currentWeather$:BehaviorSubject<ICurrentWeather>=new BehaviorSubject<ICurrentWeather>(
    {
      city:'',
      country:'',
      date:Date.now(),
      image:'',
      temperature:0,
      description:''
    }
  )
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
  updateCurrentWeather(city:string):void{
    this.getCurrentWeather(city).subscribe(weather=>{
      this.currentWeather$.next(weather)
    })
  }

  private transformWeatherData(data:ICurrentWeatherData):ICurrentWeather{
    return {
      city:data.name,
      country:data.sys.country,
      date:data.dt*1000,
      image:`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      temperature:this.convertKelvinToFahrenheit(data.main.temp),
      description:data.weather[0].description
    };
  }
  private convertKelvinToFahrenheit(kelvin: number): number
  { 
    return kelvin-273.15;
  }
}
