import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sevice: ServiceService, private dialogRef: MatDialogRef<DialogEditComponent>,
  private snapBar:MatSnackBar) { }

  // todo valide
  editTaskForm = new FormGroup({
    name: new FormControl(this.data.name,[Validators.required]),
    mail: new FormControl(this.data.mail,[Validators.required,Validators.email]),
    phone: new FormControl(this.data.phone,[Validators.required, Validators.pattern('^\\d*$'),Validators.maxLength(10)]),
    content: new FormControl(this.data.content,[Validators.required])
    // id_task: new FormControl(this.data.id_task),
    // active: new FormControl(this.data.active)
  });




  ngOnInit(): void {
  }

  onSubmit() {
    

    if ((this.data.name!=this.editTaskForm.value.name 
      || this.data.mail!=this.editTaskForm.value.mail
      || this.data.phone!=this.editTaskForm.value.phone
      || this.data.content!=this.editTaskForm.value.content)
      && this.editTaskForm.valid) 
    {
      console.log(this.editTaskForm.valid)
      let testEdit=this.editTaskForm.value
      
      testEdit.id_task=this.data.id_task
      testEdit.active=this.data.active
      this.sevice.editTask(testEdit).subscribe(res=>{
        if (res)
        this.dialogRef.close(true)
      }),err=>{console.log('erorr in sql server')}
    }
    else
    this.snapBar.open('One or more of the fields is invalid!','',{duration:2000})

  }

}
