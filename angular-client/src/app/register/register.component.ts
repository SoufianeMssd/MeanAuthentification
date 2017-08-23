import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user ={
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show('Please fill in fields',{cssClass:'alert-danger',timeout:5000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please fill in correctly email',{cssClass:'alert-danger',timeout:5000});
      return false;
    }

    // register finale
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessagesService.show('you are registered and you can log in ',{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessagesService.show('Error, please try again  ',{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['/register']);
      }
    })
  }

}
