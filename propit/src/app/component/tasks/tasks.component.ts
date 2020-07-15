import { Component, OnInit,ViewChild, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogNewComponent } from '../dialog-new/dialog-new.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { DialogSeeComponent } from '../dialog-see/dialog-see.component';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  mail: string;
  phone: number;
  data: string;
  content: string;
  active: string;
  id_task: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})



export class TasksComponent implements OnInit {

  TASKS: PeriodicElement[] = [];
  response: any;
  displayedColumnsSm: string[] = ['Name', 'Email','Options'];
  displayedColumns: string[] = ['Name', 'Email', 'Phone', 'Data','Options'];
  dataSource
  dataSourceSm

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private service: ServiceService, private dialog: MatDialog, private routr:Router) {}

  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource();
    this.getTask()
    
  }

  getTask() {

    this.service.getTask().subscribe(res => {

      this.response=res

      this.TASKS=[]
      
      this.response.forEach(item => {

        this.TASKS.push({
          name: item.name,
          mail: item.mail,
          phone: item.phone,
          data: item.creattion_date,
          content: item.content,
          active: item.active,
          id_task: item.id_task
        })
      })
      this.dataSource = new MatTableDataSource(this.TASKS)
      this.dataSourceSm = new MatTableDataSource(this.TASKS)
      this.dataSource.paginator=this.paginator.toArray()[0]
      this.dataSourceSm.paginator=this.paginator.toArray()[1]
      
    })
  }

  applyFilter(valueFilter: string) {
    this.dataSource.filter = valueFilter.trim().toLowerCase()
  }



  addTask() {


    
    let dialogRef = this.dialog.open(DialogNewComponent)
    
    dialogRef.afterClosed().subscribe(res=>{
      if (res)
      this.getTask()
    })
    
  }
  watching(task) {
    this.dialog.open(DialogSeeComponent, { data: task })
  }

  remove(idTask) 
  {
    this.service.remTask(idTask).subscribe(res=>{
      if (res)
      this.getTask()
    },
    err=>console.log(err))
  }

  edit(task) {

  
    let dialogRef= this.dialog.open(DialogEditComponent, { data: task })

    dialogRef.afterClosed().subscribe(res=>{
      if (res)
      this.getTask()
    })
  }

  parsDare(date){
    let word = date.split('T')[0].split('-');
    
    return `${word[2]}/${word[1]}/${word[0]}`
    
    
  }
  logout(){
    this.service.logout().subscribe(res=>{
      console.log(res)
      res ? this.routr.navigate(['home']) : ''
    })
  }

}

