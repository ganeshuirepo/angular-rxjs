import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import { User } from '@app/_models';

const users: User[] = [
  { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
  { id: 1, username: 'sample', password: 'sample', firstName: 'sample', lastName: 'User' },
  { id: 1, username: 'demo', password: 'demo', firstName: 'demo', lastName: 'User' }];

@Injectable({providedIn: 'root'})

export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(50)).pipe(dematerialize());

    function handleRoute() {
      switch(true) {
        case url.endsWith('/users/authenticate') && method === 'POST': return authenticate();

        case url.endsWith('/users') && method === 'GET': return getUsers();

        default: 
        return next.handle(request);
      }
    }

    function authenticate() {
      const {username, password} = body
    const user = users.find(x => x.username === username && x.password === password);
    if(!user) return error('Username or Password is Incorrect');

    return ok({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: 'fake-jwt-token'
    }) 
    }

    function getUsers() {
      if(!isLoggedIn()) return unauthorized();

      return ok(users);
    }

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}))
    }

    function error(message) {
      return throwError({ error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'unauthorized'}});
    }

    function isLoggedIn() {
      return headers.get('Auuthorixzation') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
