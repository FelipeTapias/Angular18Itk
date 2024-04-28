import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  switcher$: Subject<boolean> = this.loadingService.switcher$;

  constructor(
    private loadingService: LoadingService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.loadingService.switcher$.subscribe(status => {
      this.elementRef.nativeElement.style.display = status ? 'block' : 'none';
      this.changeDetectorRef.detectChanges();
     });
  }  
}
