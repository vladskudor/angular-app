import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, /*HttpHeaders ,*/ HttpErrorResponse , HttpRequest} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {ServiceService} from '../service/service.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class Interseptor implements HttpInterceptor{
  constructor(public svc: ServiceService) {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone(
      {
        //params: req.params.set('id' , `${this.svc.user.id}`),
        //headers: req.headers.set('AUTH_TOKEN' , this.svc.user.email)
      }
    );

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.svc.error = error;
        return throwError(error);
      })
    )
  }
}
