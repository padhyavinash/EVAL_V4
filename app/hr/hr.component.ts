import { Component } from '@angular/core';
import { AuthenticationService, UserDetails, UserResult } from '../authentication.service';
import { UserResultClass } from '../../UserResultClass';
import { PieChartService } from '../piechart.service';
import { PieChartConfig } from '../piechart';
declare var google: any;
@Component({
  templateUrl: './hr.component.html'
})
export class HrComponent {
  details: UserDetails;

  title = 'Reusable charts sample';

  data1: any[] =[
    ['Category', 'Correct Answers'],
    ['Cat1',      1],
    ['Cat2',      2],
    ['Cat3',      3],
    ['Wrong',     4]
  ];
  config1: PieChartConfig = new PieChartConfig('Final Result stat', 0.4);;
  elementId1: String = 'myPieChart1';
/* 
  candidateData : any = {
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0
  }; */
  candidateData : string;
  userResult: UserResultClass = new UserResultClass();
  /* userResult: UserResult ={
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0
  }; */

  resData: UserResult[] = [
    {
    email: '',
    name: '',
    tech: '',
    category1: 0,
    category2: 0,
    category3: 0,
    finalResult: 0
  }];

  constructor(private auth: AuthenticationService,private _pieChartService:PieChartService) {}
  
showResults(){
 // var newResData = this.resData;

  this.auth.getRes().subscribe(res => {
      
          
    this.resData = res; 
    console.log(this.resData)
  });
}

  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    this.showResults();
    
  }


  onNameClick(candidate):void{
    console.log("in on name click"+candidate);        
    this.candidateData = candidate;

    this.resData.forEach(element => {

    if(element.name==candidate)
    {
      console.log("name matched"+element.name);
      this.userResult = element;
      this.data1 = [
        ['Category', 'Correct Answers'],
        ['Cat1',      element.category1],
        ['Cat2',      element.category2],
        ['Cat3',      element.category3],
        ['Wrong',     10-(element.category1+element.category2+element.category3)]
      ];
      this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1); 
    }
    });    
  }

  showOnUI():void{
    
  }


}
