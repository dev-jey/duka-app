import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-authentication-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSpinner: Boolean;
  loginFormApiError: any;
  loginFormSubmitted: Boolean;
  authenticationErrors = {
    required: "Field is required"
  };
  userData: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    //prevent logged in user from accessing login page
    const userToken = localStorage.getItem("token");
    if (userToken) {
      this.router.navigate(["/shop"]);
    }

    //initialize login form
    this.initLoginForm();

    //initialize default values
    this.loginFormSpinner = false;
    this.loginFormSubmitted = false;
    this.loginFormApiError = { hasError: false, message: "" };
  }

  /**
   * Login form initialization
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * Login api integration
   */
  login(e) {
    e.preventDefault();
    this.loginFormSubmitted = true;
    this.loginFormApiError = { hasError: false, message: "" };
    //validate form
    if (this.loginForm.invalid) {
      return;
    }
    //api integration
    this.loginFormSpinner = true;
    const sub = this.auth
      .login(this.loginForm.value)
      .subscribe(
        resp => {
          //save token to local storage
          localStorage.setItem("token", resp["token"]);

          this.loginFormSubmitted = false;
          this.loginFormSpinner = false;

          this.toastr.success("Login Successful", 'Success!');
          this.router.navigate(["shop"]);

          //unsubscribe
          if (sub) {
            sub.unsubscribe();
          }
        },
        error => {
          this.loginFormSubmitted = false;
          this.loginFormSpinner = false;
          this.loginFormApiError = { hasError: true, message: error.error.Message };

          this.toastr.error(error.error.Message, 'Error!');
          //unsubscribe
          if (sub) {
            sub.unsubscribe();
          }
        })
  }
}