import { Component, AfterViewInit, OnInit, DoCheck } from "@angular/core";
import { AuthService } from './service/auth/auth.service';
import { WalletService } from './service/wallet/wallet.service';
import { host } from './shared/config';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title: string = "BitBuild";
  user: object = {}
  token: string = ''
  email: string = ''
  
  constructor(private AuthService: AuthService, private WalletService: WalletService) { }
  ngOnInit() {
    this.WalletService.get(`${host}/v1/refresh/token`).subscribe(
      user => this.refreshAuth(user),
      err => this.AuthService.logout()
    )
  }
  refreshAuth(user) {
    const { id, guid, token, email } = user;
    this.AuthService.authenticate(id, token, guid, email)
    this.token = token;
    this.email = email;
  }

  logout() {
    this.token = ''
    this.email = ''
    this.AuthService.logout()
  }
  authenticate() {
    const { token, email } = this.AuthService.verifyAuth()
    this.token = token;
    this.email = email;
  }
}
