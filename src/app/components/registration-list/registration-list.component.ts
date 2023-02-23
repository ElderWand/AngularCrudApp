import { ApiService } from './../../services/api.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'userGender', 'userPackage', 'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) {

  };

  ngOnInit(){
    this.getUsers();
  }

  getUsers() {
    this.api.getRegistredUser()
    .subscribe(res=>{
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
