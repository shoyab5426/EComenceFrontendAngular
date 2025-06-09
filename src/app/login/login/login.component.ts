import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../service/login-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  login!: FormGroup;
  signupForm!: FormGroup;

  constructor(private _loginService:LoginServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginFormInit();
    this.signUpFormInit();
  }

  loginFormInit(){
    this.login = new FormGroup({
      userName : new FormControl(''),
      password : new FormControl('')
    })
  }

  signIn(){
    let formdata = this.login.controls;
    let payload = {
      username : formdata['userName'].value,
      password : formdata['password'].value
    }

    this._loginService.login(payload).subscribe({
      next : (res : any)  =>{
       
        if(res.success){
          sessionStorage.setItem('auth', btoa(`${payload.username}:${payload.password}`));
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        }

      },error : (err) =>{

      }
    });

    console.log("Logged in form clicked.", formdata)
    console.log("Logged in form clicked.", payload)
  }


  signUpFormInit(){
    this.signupForm = new FormGroup({
      userName : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
      confirmPassword : new FormControl('')
    })
  }

  signUp(){
    let formData = this.signupForm.controls;
    let payload = {
      password : formData["password"].value,
      email : formData["email"].value,
      username : formData["userName"].value
    }
    console.log(this.signupForm)
    this._loginService.registerUser(payload).subscribe({
      next : (res:any) =>{
        console.log(res);
      }
      ,error : (err) =>{
        console.log(err)
      }
    });
  }

}
