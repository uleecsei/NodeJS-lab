import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public counterValue = 0;

  public onIncrease(value: number): void {
    this.counterValue += value;
  }

  public onDecrease(value: number): void {
    this.counterValue -= value;
  }
}