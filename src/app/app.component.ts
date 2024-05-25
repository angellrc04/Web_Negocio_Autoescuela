import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  title = 'Proyecto_Final';

  constructor(public auth: AuthService){}

  ngOnInit(): void {

  }

  logOut() {
    this.auth.logout()
  }
  login() {
    this.auth.loginWithRedirect()
  }
}
