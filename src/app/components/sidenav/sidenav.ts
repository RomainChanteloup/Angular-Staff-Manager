import { Component } from '@angular/core';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.html',
  styleUrls: ['sidenav.css'],
})
export class SideNav {
  MenuIconClickedHandler(value: string) {
    console.log(value);
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
