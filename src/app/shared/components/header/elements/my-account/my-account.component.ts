import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/firebase/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  nombre;
  constructor(public authService: AuthService, public router: Router) {
    let nameC = localStorage.getItem("user");
    this.nombre = nameC;
  }

  ngOnInit() {}
  cambiaNick() {
    localStorage.setItem("user", null);
    this.router.navigate([`/`]);
  }
}
