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
  testValue: string = '';
  sideNavOpen: boolean = false;
  msgOnButtonClick: string;

  MenuIconClickedHandler(value: Event) {
    console.log('reçu', value);
    this.sideNavOpen = !this.sideNavOpen;
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
