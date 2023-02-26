import { ApiService } from './../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public userId!: number;
  userDetails!: User;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
    
  }

  fetchUserDetails(userID: number) {
    this.api.getRegisterdUserId(userID)
    .subscribe(res=>{
      this.userDetails = res;
    })
  }

  editEnquiry(id: number) {
    this.router.navigate(['update', id]);
  }
}
