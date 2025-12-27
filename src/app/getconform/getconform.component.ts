import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconform',
  templateUrl: './getconform.component.html',
  styleUrls: ['./getconform.component.scss']
})
export class GetconformComponent implements OnInit {

  constructor(private _diaRef : MatDialogRef<GetconformComponent>) { }

  ngOnInit(): void {
  }

  onRemove(){

    this._diaRef.close(true)
  }

  onclose(){
    this._diaRef.close(false)
  }

}
