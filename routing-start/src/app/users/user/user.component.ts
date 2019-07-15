import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private activeRout: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.activeRout.snapshot.params['id'],
      name: this.activeRout.snapshot.params['name']
    }
    this.activeRout.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name']
      }
    )
  }

}
