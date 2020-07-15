import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-see',
  templateUrl: './dialog-see.component.html',
  styleUrls: ['./dialog-see.component.css']
})
export class DialogSeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<DialogSeeComponent >) { }

  ngOnInit(): void {
  }

  parsDate(date){
    let word = date.split('T')[0].split('-');
    
    return `${word[2]}/${word[1]}/${word[0]}`
 
  }

}
