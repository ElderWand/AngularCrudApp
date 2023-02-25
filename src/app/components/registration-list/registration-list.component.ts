import { ApiService } from './../../services/api.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  editEnquiry(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteUserEnquiry(id: number) {
    this.confirm.showConfirm("Are you sure you want to delete this enquiry?",
      () => {
        this.api.deleteRegisterdUser(id)
          .subscribe(res => {
            this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
            this.getUsers();
          })
      },
      () => {

      })
  }

  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'userGender', 'userPackage', 'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: NgToastService,
    private confirm: NgConfirmService) {

  };

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegistredUser()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
