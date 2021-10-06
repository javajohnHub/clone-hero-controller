import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  songData: any[] = [];
  gamepadIndex = 0;
  color = '';
  myGamepad: any;
  pressed = [false, false, false, false, false];
  colors = ['green', 'red', 'yellow', 'blue', 'orange'];
  up = false;
  down = false;
  strum = false;
  constructor() {
  }

  ngOnInit() {
    window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
      this.gamepadIndex = e.gamepad.index;
    });

    setInterval(() => {
      if (this.gamepadIndex !== undefined) {
        // a gamepad is connected and has an index
        this.myGamepad = navigator.getGamepads()[this.gamepadIndex];
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

  trackByFn(index: number) {
    return index;
  }
}
