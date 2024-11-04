import { Component, OnInit } from '@angular/core';
import { Contactus } from 'src/app/models/contactus.model.js';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com'; // Import EmailJS

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

  constructor(private builder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.contactFormData = this.builder.group({
      uName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      major: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required]),
      message: new FormControl()
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }

  onSubmit(contactFormData: Contactus) {
    const emailParams = {
      user_name: contactFormData.uName,
      user_email: contactFormData.email,
      user_phone: contactFormData.phoneNumber,
      user_major: contactFormData.major,
      message: contactFormData.message,

      user_request: "Query",
      user_joinDate: "null",
      user_learnProgramming: "null",
      user_hackathons: "null",
      user_networking: "null",
      user_becomeOfficer: "null",
      user_isOfficer: "null",
      user_team: "null",
      user_transactionId: "null"
    };

    // Replace 'YOUR_PUBLIC_KEY' with the public key from the EmailJS dashboard
    emailjs.send('service_kg6ypmk', 'template_k1rf4cl', emailParams, 'y0P41lIpdxLOBTYzz')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email successfully sent!', response.status, response.text);
        this.submitted = true;
        this.contactFormData.reset();
        this.router.navigate(['contactus']);
      }, (error) => {
        console.error('Failed to send email.', error);
      });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
