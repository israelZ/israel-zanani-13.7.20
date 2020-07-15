import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {UserComponent} from '../user/user.component'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm = new FormGroup({
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
  });

  constructor(private service: ServiceService, private router: Router,private dialog: MatDialog,private snapBar:MatSnackBar) { }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.userForm.value);

    if (this.userForm.valid)
     {
       this.service.getFundUser(this.userForm.value).subscribe(res => {
           // TODO protect this
           this.router.navigate(['task'])},err => this.snapBar.open('One or more of the fields is invalid','',{duration:2000}))
    }
    else
    this.snapBar.open('Missing fields required','',{duration:2000});
  }

  addUser(){
    this.dialog.open(UserComponent)
  }
}
