import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.page.html',
  styleUrls: ['./nutrition.page.scss'],
})
export class NutritionPage implements OnInit {
  public progressValue = 0;
  public isOverLimit = false;
  constructor() { }

  ngOnInit() {
  }

public incrementBar (){
  if (this.progressValue >= 100) {
    this.progressValue = 100;
    this.isOverLimit = true;
  }
else{
  this.progressValue += 10;
}
  
}
}
