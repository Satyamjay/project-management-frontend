import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service'
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  
  public loading = false;

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(private loginService: AuthService, private router: Router, private alertService: AlertService) { }

  onSubmit() {
    if(this.loginForm.invalid){
      if(this.loginForm.get('emailId').invalid)
        this.alertService.warning('Invalid Email');
      if(this.loginForm.get('password').invalid)
        this.alertService.warning('Password cannot be empty');
    }
    else{
      this.loading = true;
      this.loginService.login(this.loginForm.get("emailId").value, this.loginForm.get("password").value).subscribe(
        (res)=>{
          this.loading = false;
          if(res.role==="ROLE_ADMIN")
            this.router.navigateByUrl("/admin");
          else if(res.role=="ROLE_PROJECT_HANDLER")
            this.router.navigateByUrl("/project-handler")
          else if(res.role=="ROLE_DEVELOPER")
            this.router.navigateByUrl("/developer")
          else
            this.alertService.warning('Invalid Role');
          
        },
      (res)=>{
          this.loading = false;
          this.alertService.warning('Invalid Email or password');
          console.log(res);
       }
      )
    }
  }
}
