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


  @ViewChild('StudentName') StudentName !: ElementRef;
  @ViewChild('StudentLname') StudentLname !: ElementRef;
  @ViewChild('Email') Email !: ElementRef;
  @ViewChild('Contact') Contact !: ElementRef;


  studentArr: Array<Istudent> = students2


  isinEditMode: boolean = false;
  EditId: string = ""


  addStudent() {
    if (this.StudentName.nativeElement.value) {
      let stdobj: Istudent = {
        fname: this.StudentName.nativeElement.value,
        lname: this.StudentLname.nativeElement.value,
        email: this.Email.nativeElement.value,
        contact: this.Contact.nativeElement.value,
        id: this.uuid()
      }

      this.studentArr.push(stdobj);
      this.StudentName.nativeElement.value = "";
      this.StudentLname.nativeElement.value = "";
      this.Email.nativeElement.value = "";
      this.Contact.nativeElement.value = "";
    }

    this.snackBar.open(`The student with id is created successfully `,"CLose",{
      horizontalPosition: "left",
      verticalPosition : "top",
      duration : 2000
    })


  }

  trckById(index : number, todo : Istudent){
    return todo.id
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


  onEdit(std: Istudent) {

    this.StudentName.nativeElement.value = std.fname;
    this.StudentLname.nativeElement.value = std.lname;
    this.Email.nativeElement.value = std.email
    this.Contact.nativeElement.value = std.contact;
    this.EditId = std.id
    this.isinEditMode = true
  }


  OnUpdate() {

    let UPDATE_OBJ: Istudent = {

      fname: this.StudentName.nativeElement.value,
      lname: this.StudentLname.nativeElement.value,
      email: this.Email.nativeElement.value,
      contact: this.Contact.nativeElement.value,
      id: this.EditId
    }

    let getIndex = this.studentArr.findIndex(p => p.id === UPDATE_OBJ.id);

    this.studentArr[getIndex] = UPDATE_OBJ;

    this.StudentName.nativeElement.value = "";
    this.StudentLname.nativeElement.value = "";
    this.Email.nativeElement.value = "";
    this.Contact.nativeElement.value = "";
    this.isinEditMode = false

    this.snackBar.open(`The student with id is Updated successfully `,"CLose",{
      horizontalPosition: "left",
      verticalPosition : "top",
      duration : 2000
    })
  }














}
