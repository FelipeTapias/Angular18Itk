import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss']
})
export class EmptyContentComponent {
  @Input() imgName!: string;
  @Input() text!: string
}
