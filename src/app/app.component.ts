import { Component, AfterViewInit, OnInit, DoCheck } from "@angular/core";
import { AuthService } from './service/auth/auth.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = "BitBuild";
  user = {}
  
  constructor(private AuthService: AuthService) { }
  ngOnInit() {
    this.user = this.AuthService.verifyAuth()
  }

  logout() {
    this.user = {}
    this.AuthService.logout()
  }
  authenticate() {
    this.user = this.AuthService.verifyAuth()
  }
}
