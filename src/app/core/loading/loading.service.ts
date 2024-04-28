import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingState = false;
  switcher$ = new Subject<boolean>();

  constructor() {
    this.initiateLoading()
  }

  private initiateLoading = () => this.switcher$.subscribe(state => this.loadingState = state);
    
  start(): Subject<boolean> {
    const loadingStarted = this.isStarted();
    if (!loadingStarted) {
      this.switcher$.next(true);
    }
    return this.switcher$;
  }

  end(): Subject<boolean> {
    this.switcher$.next(false); 
    return this.switcher$; 
  }

  isStarted = () => this.loadingState; 
  
}
