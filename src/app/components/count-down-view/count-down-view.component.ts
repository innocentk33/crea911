import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-count-down-view',
  templateUrl: './count-down-view.component.html',
  styleUrls: ['./count-down-view.component.css']
})
export class CountDownViewComponent implements OnInit , OnDestroy{

  @Input() end;
  displayTime: string;
  timer: any;

  constructor() {
  }

  ngOnInit(): void {
    this.timer = setInterval(() => { 
        this.displayTime = this.getTimeDiff(this.end) 
      }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getTimeDiff( datetime ) {

      datetime = new Date( datetime ).getTime();
      let now = new Date().getTime();
  
      if( isNaN(datetime) )
      {
          return "";
      }
  
      //console.log( datetime + " " + now);
      let milisec_diff = 0;
      if (datetime < now) {
           milisec_diff = now - datetime;
      }else{
           milisec_diff = datetime - now;
      }
      let days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
      let date_diff = new Date( milisec_diff );
  
      return days + "j "+ date_diff.getHours() + "h " + date_diff.getMinutes() + "mm" ;//+ date_diff.getSeconds() + "s";
  }
  

}
