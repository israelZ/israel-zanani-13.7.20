import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private servis:ServiceService,private snapBar:MatSnackBar,private dialogRef:MatDialogRef<UserComponent>) { }

  newUserForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.maxLength(6)]),
    family: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.newUserForm.valid)
    {
      this.servis.addUser(this.newUserForm.value).subscribe(res=>{
        if (res) {
          this.dialogRef.close(true);
        }
      },
      err=>{
        this.snapBar.open('erorr in server','',{duration:2000})
      })
    }
    else
    this.snapBar.open('One or more of the fields is invalid!','',{duration:2000})
  }

}
