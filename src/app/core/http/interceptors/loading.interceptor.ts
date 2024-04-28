import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requestCount = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requestCount++;
    if(this.requestCount === 1) {
      this.loadingService.start();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;
        if(this.requestCount === 0) {
          this.turnOffLoading();
        }
      })
    );
  }

  turnOffLoading = () =>  {
    this.loadingService.end();
  }

}
