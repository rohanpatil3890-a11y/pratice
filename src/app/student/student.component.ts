import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../shared/model/student';
import { students2 } from '../shared/const/student';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconformComponent } from '../getconform/getconform.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private Matdilog: MatDialog) { }

  ngOnInit(): void {
  }

  uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
      /[xy]/g,
      character => {
        const random = (Math.random() * 16) | 0
        const value = character === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16)
      }
    )
  }

  @ViewChild('Fname') Fname !: ElementRef
  @ViewChild('Lname') Lname !: ElementRef
  @ViewChild('Email') Email !: ElementRef
  @ViewChild('Contact') Contact !: ElementRef

  isinEditMode: boolean = false;
  EditId : string=""


  studentArr: Array<Istudent> = students2


  onAdduser() {

    if (this.Fname.nativeElement.value) {
      let StudentObj: Istudent = {

        fname: this.Fname.nativeElement.value,
        lname: this.Lname.nativeElement.value,
        email: this.Email.nativeElement.value,
        contact: this.Contact.nativeElement.value,
        id: this.uuid()

      }

      this.studentArr.unshift(StudentObj);
      this.Fname.nativeElement.value = "";
      this.Lname.nativeElement.value = "";
      this.Email.nativeElement.value = "";
       this.Contact.nativeElement.value = "";

       this.snackBar.open(`The student with id ${StudentObj.id} is created successfully`,"Close",{
        horizontalPosition : "left",
        verticalPosition : "top",
        duration : 2000
       })

    }
  }

  onRemove(id: string) {

    let maConfig = new MatDialogConfig()

    maConfig.disableClose = true;

    let logERf = this.Matdilog.open(GetconformComponent, maConfig)


    logERf.afterClosed().subscribe((result: boolean) => {

      if (result) {
        let getIndex = this.studentArr.findIndex(s => s.id === id)
        this.studentArr.splice(getIndex, 1)

        this.snackBar.open(`The student with id ${id} is removed successfully !!!`, "Close", {
          horizontalPosition: "left",
          verticalPosition: "top",
          duration: 2000
        })
      }

    })


  }

  OnEdit(std: Istudent) {

    this.Fname.nativeElement.value = std.fname;
    this.Lname.nativeElement.value = std.lname;
    this.Email.nativeElement.value = std.email;
    this.Contact.nativeElement.value = std.contact;
    this.EditId = std.id;
    this.isinEditMode = true;
  }

  onUpdate() {

    let UPDATE_OBJSTU: Istudent = {

      fname: this.Fname.nativeElement.value,
      lname: this.Lname.nativeElement.value,
      email: this.Email.nativeElement.value,
      contact: this.Contact.nativeElement.value,
      id: this.EditId
    }

    this.Fname.nativeElement.value = "";
    this.Lname.nativeElement.value = "";
    this.Email.nativeElement.value = "";
     this.Contact.nativeElement.value = "";

    let getIndex = this.studentArr.findIndex(s => s.id === UPDATE_OBJSTU.id);
    this.studentArr[getIndex] = UPDATE_OBJSTU;
    this.isinEditMode = false;
    this.EditId = "";

    this.snackBar.open(`The Student with id ${UPDATE_OBJSTU.id} is updated successfully`,"Close",{
      horizontalPosition : "left",
      verticalPosition : "top",
      duration : 2000
    })
  }

}
