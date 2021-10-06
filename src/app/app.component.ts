import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  songData: any[] = [];
  gamepadIndex = 0;
  myGamepad: any = {};
  color = '';
  pressed = [false, false, false, false, false];
  colors = ['green', 'red', 'yellow', 'blue', 'orange'];
  up = false;
  down = false;
  strum = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
        this.gamepadIndex = e.gamepad.index;
      });
      setInterval(() => {
        this.myGamepad = navigator.getGamepads()[this.gamepadIndex];
        if (this.gamepadIndex !== undefined && this.myGamepad !== null) {
          // a gamepad is connected and has an index
          this.myGamepad.buttons
            .map((e: any) => e.pressed)
            .forEach((isPressed: any, buttonIndex: any) => {
              if (isPressed) {
                if (buttonIndex === 8) {
                  this.up = true;
                  this.down = false;
                }
                if (buttonIndex === 5) {
                  this.down = true;
                  this.up = false;
                }
                if (buttonIndex !== 5 && buttonIndex !== 8) {
                  this.down = false;
                  this.up = false;
                }
                // button is pressed; indicate this on the page
                this.pressed[buttonIndex] = true;
  
              } else {
                this.pressed[buttonIndex] = false;
              }
            });
        }
      }, 5);
    }
  }

  trackByFn(index: number) {
    return index;
  }
}
