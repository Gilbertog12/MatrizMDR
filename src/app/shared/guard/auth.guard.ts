import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpMethodService } from '../services/http-method.service';
import { ControlsService } from '../services/controls.service';

@Injectable()
export class AuthGuard implements CanActivate {

  returnUrl: string;
  constructor(private router: Router,
              private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private route: ActivatedRoute) {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] === undefined || this.route.snapshot.queryParams['returnUrl'] === '' ? '/inicio' : this.route.snapshot.queryParams['returnUrl'];
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('tokenApp')) {
        console.log(JSON.parse(localStorage.getItem('tokenApp')))
        debugger;
        const token = JSON.parse(localStorage.getItem('tokenApp'));
        const expiracion: number = token.expires_in / 3600;
        const fechaInicial: number = new Date(localStorage.getItem('datePTEL')).getTime();
        const fechaFinal: number = new Date().getTime();
        const totalHoras = Math.abs(fechaFinal - fechaInicial) / 36e5;

        if (totalHoras > expiracion) {
          // const spinner = this.controlService.openSpinner();
          // this.autentication.actualizar_token()
          //   .subscribe(
          //     (data) => {

          //       const result = data && data.access_token;

          //       if (result) {
          //         // store user details and jwt token in local storage to keep user logged in between page refreshes
          //         localStorage.setItem('isLoggedin', 'true');
          //         localStorage.setItem('token', JSON.stringify(data));
          //         localStorage.setItem('date', new Date().toString());
          //       }
          //       this.controlService.closeSpinner(spinner);
          //       return result;
          //   },
          //   (error) => {
          //     this.controlService.closeSpinner(spinner);
          //     this.controlService.snackbarError('Token invalido.');
          //   });
          if (localStorage.getItem('isLoggedinApp') === 'true') {
            return true;
          }
        }else{
          this.autentication.logout();
          
        }

    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
 
}
