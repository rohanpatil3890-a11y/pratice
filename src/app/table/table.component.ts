import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Iuser } from '../model/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconformComponent } from '../getconform/getconform.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(

    private snackbar: MatSnackBar,
    private MatDialog: MatDialog) { }

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

  @ViewChild('name') name !: ElementRef;
  @ViewChild('lname') lname !: ElementRef;
  @ViewChild('email') email !: ElementRef;
  @ViewChild('contact') contact !: ElementRef;

  isinEditMode: boolean = false;
  EditId !: string;

  students: Array<Iuser> = [
    {
      fname: "Rohan",
      lname: "Patil",
      email: "rohan.patil@gmail.com",
      contact: 9876543210,
      id: "123"
    },
    {
      fname: "Amit",
      lname: "Sharma",
      email: "amit.sharma@gmail.com",
      contact: 9123456780,
      id: "124"
    },
    {
      fname: "Sneha",
      lname: "Kulkarni",
      email: "sneha.kulkarni@gmail.com",
      contact: 9988776655,
      id: "125"
    },
    {
      fname: "Priya",
      lname: "Deshmukh",
      email: "priya.deshmukh@gmail.com",
      contact: 9012345678,
      id: "126"
    },
    {
      fname: "Rahul",
      lname: "Verma",
      email: "rahul.verma@gmail.com",
      contact: 8899776654,
      id: "127"
    },
    {
      fname: "Neha",
      lname: "Joshi",
      email: "neha.joshi@gmail.com",
      contact: 9765432109,
      id: "128"
    },
    {
      fname: "Kunal",
      lname: "Mehta",
      email: "kunal.mehta@gmail.com",
      contact: 9345678123,
      id: "129"
    },
    {
      fname: "Pooja",
      lname: "Nair",
      email: "pooja.nair@gmail.com",
      contact: 9098765432,
      id: "130"
    },
    {
      fname: "Saurabh",
      lname: "Singh",
      email: "saurabh.singh@gmail.com",
      contact: 9812345670,
      id: "131"
    },
    {
      fname: "Anjali",
      lname: "Chavan",
      email: "anjali.chavan@gmail.com",
      contact: 9876123456,
      id: "132"
    }
  ];


  onAddUser() {

    if (this.name.nativeElement.value) {
      let UserObj: Iuser = {

        fname: this.name.nativeElement.value,
        lname: this.lname.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: this.contact.nativeElement.value,
        id: this.uuid()
      }
      this.students.unshift(UserObj);
      this.name.nativeElement.value = "";
      this.lname.nativeElement.value = "";
      this.email.nativeElement.value = "";
      this.contact.nativeElement.value = "";
      this.snackbar.open(`The New user with id ${UserObj.id} is created successfully`, "Close", {
        horizontalPosition: "left",
        verticalPosition: "top",
        duration: 2000
      })
    }



  }

  onRemove(id: string) {

    // let MatConfig = new MatDialogConfig()

    let DiGConf: MatDialogConfig = {

      disableClose: true

    }

    let MatDialogRef = this.MatDialog.open(GetconformComponent, DiGConf);

    MatDialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

        let getIndex = this.students.findIndex(c => c.id === id);
        this.students.splice(getIndex, 1)

        this.snackbar.open(`The User with id ${id} is removed successfully`, "Close", {
          horizontalPosition: "left",
          verticalPosition: "top",
          duration: 2000
        })
      }
    })


  }

  onEdit(user: Iuser) {

    this.name.nativeElement.value = user.fname;
    this.lname.nativeElement.value = user.lname;
    this.email.nativeElement.value = user.email;
    this.contact.nativeElement.value = user.contact;
    this.EditId = user.id;
    this.isinEditMode = true;
  }


  onUpdate() {

    let UPDATE_USEROBJ: Iuser = {
      fname: this.name.nativeElement.value,
      lname: this.lname.nativeElement.value,
      email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      id: this.EditId
    }

    let getIndex = this.students.findIndex(u => u.id === UPDATE_USEROBJ.id);
    this.students[getIndex] = UPDATE_USEROBJ;
    this.isinEditMode = false;

    this.name.nativeElement.value = "";
    this.lname.nativeElement.value = "";
    this.email.nativeElement.value = "";
    this.contact.nativeElement.value = "";
    this.snackbar.open(`The User with id ${UPDATE_USEROBJ.id} is updated successfully`, "Close", {
      horizontalPosition: "left",
      verticalPosition: "top",
      duration: 2000
    })
  }

}
