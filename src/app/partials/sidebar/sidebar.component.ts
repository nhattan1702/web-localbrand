import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const body = $('body');

    $('[data-bs-toggle="minimize"]').on("click", function() {
      if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });
  }
}
