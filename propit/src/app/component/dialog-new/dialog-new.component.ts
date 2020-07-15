import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-new',
  templateUrl: './dialog-new.component.html',
  styleUrls: ['./dialog-new.component.css']
})
export class DialogNewComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<DialogNewComponent>,private service :ServiceService,
    private snapBar:MatSnackBar) { }

  newTaskForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    content: new FormControl('',[Validators.required])
  });


  ngOnInit(): void {
  }

  onSubmit(){
    
    if (this.newTaskForm.valid)
    {
       this.service.addTask(this.newTaskForm.value).subscribe(res=>{
         if (res) 
         this.dialogRef.close(true);
       
       })  
    }
    else{
      this.snapBar.open('One or more of the fields is invalid!','',{duration:2000})
    }
  }
}
