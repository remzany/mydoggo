import { Component, OnInit } from '@angular/core';


interface DogProfileData {
  name: string,
  breed: string,
  weight: number,
  birthDate: string
}

interface DogWalks{
  dogWalksPerDay: number,
  currentWalks: number
}

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.scss'],
})
export class DogProfileComponent implements OnInit {


  dummyData: DogProfileData = {
    name: "Sia",
    breed: "Srednji nemski Spic",
    birthDate: "10.10.2020",
    weight: 2.5
  }
  
  constructor() { }

  ngOnInit() {}

}
