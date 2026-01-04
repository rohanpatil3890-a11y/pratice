import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../shared/model/todo';
import { todo } from '../shared/const/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetconformComponent } from '../getconform/getconform.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(
    private Matdilog: MatDialog,
    private _snackbar: MatSnackBar) { }

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

  todoArr: Array<Itodo> = todo;

  @ViewChild('todoName') todoName !: ElementRef;

  isinEditMode: boolean = false;
  EditId !: string

  AddTodo() {

    if (this.todoName.nativeElement.value) {
      let tododObj: Itodo = {
        name: this.todoName.nativeElement.value,
        id: this.uuid()
      }

      this.todoArr.push(tododObj)
      this.todoName.nativeElement.value = "";
    }
    this._snackbar.open(`todo item with id a created successfully`, "Close", {
      horizontalPosition: "left",
      verticalPosition: "top",
      duration: 2000
    })

  }

trckById(index : number, todo : Itodo){
  return todo.id
}


  onRemove(id: string) {

    let maConfig = new MatDialogConfig()

    maConfig.disableClose = true;

    let logERf = this.Matdilog.open(GetconformComponent, maConfig)


    logERf.afterClosed().subscribe((result: boolean) => {

      if (result) {
        let getIndex = this.todoArr.findIndex(s => s.id === id)
        this.todoArr.splice(getIndex, 1)

        this._snackbar.open(`The student with id ${id} is removed successfully !!!`, "Close", {
          horizontalPosition: "left",
          verticalPosition: "top",
          duration: 2000
        })
      }

    })


  }

  onEdit(todo: Itodo) {

    this.todoName.nativeElement.value = todo.name;
    this.EditId = todo.id
    this.isinEditMode = true;
  }


  onUpdate() {
    let updateObj: Itodo = {
      name: this.todoName.nativeElement.value,
      id: this.EditId
    }

    let getIndex = this.todoArr.findIndex(p => p.id === updateObj.id);

    this.todoArr[getIndex] = updateObj

    this.todoName.nativeElement.value = "";
    this.isinEditMode = false;


    this._snackbar.open(`todo item with id updated successfully`, "Close", {
      horizontalPosition: "left",
      verticalPosition: "top",
      duration: 2000
    })
  }


}




