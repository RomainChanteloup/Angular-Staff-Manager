import { Component, OnInit, EventEmitter, Output } from '@angular/core';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar-basic-example',
  templateUrl: 'toolbar-basic-example.html',
  styleUrls: ['toolbar-basic-example.css'],
})
export class ToolbarBasicExample {
  @Output() MenuIconClicked = new EventEmitter();

  clickMenuIcon() {
    console.log('test');
    this.MenuIconClicked.emit('User click on Menu Icon');
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
