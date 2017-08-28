import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'pssr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private lastRoute: string;

  constructor(
    private router: Router,
    private location: Location,
    private googleAnalytics: Angulartics2GoogleAnalytics
  ) {}

  ngOnInit() {
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastRoute = ev.url;
    });

    this.router.events
      .subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          // see https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change
          if (ev.url === this.lastRoute) {
            this.lastRoute = undefined;
          } else {
            window.scrollTo(0, 0);
          }
        }
      });
  }
}
