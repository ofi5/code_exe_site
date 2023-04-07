import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Signup } from 'src/app/models/signup.model';
import { SignupService } from 'src/app/services/signup.service';
import '../../../../assets/js/smtp.js';
declare let Email: any;


@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})

export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;
  focus4: any;
  focus5: any;
  submitted = false;
  signup: Signup = new Signup();
  
  formData: FormGroup;

  constructor(private builder: FormBuilder,private signupService: SignupService) { }

  newMember(): void {
    this.submitted = false;
    this.signup = new Signup();
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  ngOnInit() {

   this.formData = this.builder.group({
    fullName: new FormControl('', [Validators.required]),
    UTDEmail: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    joinDate: new FormControl('', [Validators.required]),
    major: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',[Validators.requiredTrue]),
    ToLearnProgLanuages: new FormControl(),
    Hackathons: new FormControl(),
    Networking: new FormControl(),
    ToBecomeAnOfficer: new FormControl(),
    AreYouAnOfficer: new FormControl(),
    Team: new FormControl(),
    txnId: new FormControl()
    }) 

  
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
     
  }

  onSubmit(formData: Signup) {

    if(formData.fullName =="" || formData.UTDEmail == "" || formData.txnId == "" || formData.txnId == null){
      this.submitted = false;
      return;
    }
    this.signupService.create(formData).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });

   Email.send({
      Host : `smtp.elasticemail.com`,
      Username : `pdevharkar@gmail.com`,
      Password : `9C3EB8C99318FC78B711D186B1F063C997B9`,
      To : formData.UTDEmail,
      From : `pdevharkar@gmail.com`,
      Subject : 'Code.exe Test Email',
      Body : `
      <p>Dear ${formData.fullName}</p> <br/> Thank you for signing up! We have received your details. <br><br> Regards, <br><b> Team Code.exe</b>`
      }).then( (message: any) => {console.log(message)});

      Email.send({
      Host : `smtp.elasticemail.com`,
      Username : `pdevharkar@gmail.com`,
      Password : `9C3EB8C99318FC78B711D186B1F063C997B9`,
      To : `pratik_dev91@hotmail.com`,
      From : `pdevharkar@gmail.com`,
      Subject : 'Code.exe - Member registration',
      Body : `
      <p>New member registration details :</p> <br/> 
      <b> Name:</b> ${formData.fullName} <br/>
      <b> UTD Email: </b> ${formData.UTDEmail} <br/>
      <b> Contact No: </b> ${formData.phoneNumber} <br/>
      <b> Join Date: </b> ${formData.joinDate} <br/>
      <b> Major: </b> ${formData.major} <br/>
      <b> Officer: </b> ${formData.AreYouAnOfficer} <br/>
      <b> Team: </b> ${formData.Team} <br/>
      <b> Txn Id:</b> ${formData.txnId}`
      }).then( (message: any) => {console.log(message)}) ; 
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
