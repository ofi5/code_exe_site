import { Component, OnInit } from '@angular/core';
import { Contactus } from 'src/app/models/contactus.model.js';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import '../../../../assets/js/smtp.js';
import { Router } from '@angular/router';
declare let Email: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  isCollapsed = true;
  submitted = false;
  contactus: Contactus = new Contactus();

  contactFormData: FormGroup;

  constructor(private builder: FormBuilder,private router: Router) {}

  ngOnInit() {

    this.contactFormData = this.builder.group({
      uName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      major: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',[Validators.requiredTrue]),
      message: new FormControl()
      }) 

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }

  onSubmit(contactFormData: Contactus) {

    Email.send({
      Host : `smtp.elasticemail.com`,
      Username : `pdevharkar@gmail.com`,
      Password : `9C3EB8C99318FC78B711D186B1F063C997B9`,
      To : contactFormData.email,
      From : `pdevharkar@gmail.com`,
      Subject : 'Code.exe - Query received',
      Body : `
      <p>Dear ${contactFormData.uName}</p> <br/> Thank you for your message! We have received your query. <br><br> Regards, <br><b> Team Code.exe</b>`
      }).then( (message: any) => {console.log(message)});

      Email.send({
      Host : `smtp.elasticemail.com`,
      Username : `pdevharkar@gmail.com`,
      Password : `9C3EB8C99318FC78B711D186B1F063C997B9`,
      To : `pratik_dev91@hotmail.com`,
      From : `pdevharkar@gmail.com`,
      Subject : 'Code.exe - Query from user',
      Body : `
      <p>Query received from user :</p> <br/> 
      <b> Name:</b> ${contactFormData.uName} <br/>
      <b> UTD Email: </b> ${contactFormData.email} <br/>
      <b> Contact No: </b> ${contactFormData.phoneNumber} <br/>
      <b> Major: </b> ${contactFormData.major} <br/>
      <b> Message:</b> ${contactFormData.message}`
      }).then( (message: any) => {console.log(message)}) ;

      this.submitted = true;
      this.contactFormData.reset();
      this.router.navigate(['contactus']);
      
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
