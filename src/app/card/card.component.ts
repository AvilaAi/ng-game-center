import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  numbers = Array(18);


  constructor(private user:UserServiceService) {

    this.user.getData().subscribe(data=>{
      console.log(data)
    })
  }

  ngOnInit(): void {



  }
}
