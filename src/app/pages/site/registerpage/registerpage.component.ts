import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import emailjs from 'emailjs-com';
import noUiSlider from 'nouislider';

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html",
  styleUrls:["registerpage.component.scss"]
})
export class RegisterpageComponent implements OnInit, OnDestroy, AfterViewInit {
  isCollapsed = true;
  submitted = false;
  formData: FormGroup;

  constructor(private builder: FormBuilder) {
    emailjs.init('y0P41lIpdxLOBTYzz');  // Initialize EmailJS with User ID
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: MouseEvent) {
    const squares = Array.from(document.querySelectorAll('[id^="square"]'));
    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

    squares.forEach((square: HTMLElement, index: number) => {
      const rotationFactor = index < 6 ? 0.05 : 0.02;
      square.style.transform = `perspective(500px) rotateY(${posX * rotationFactor}deg) rotateX(${posY * -rotationFactor}deg)`;
    });
  }

  ngOnInit() {
    // Initialize form with validation rules
    this.formData = this.builder.group({
      fullName: new FormControl('', [Validators.required]),
      UTDEmail: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      joinDate: new FormControl('', [Validators.required]),
      major: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      ToLearnProgLanuages: new FormControl(),
      Hackathons: new FormControl(),
      Networking: new FormControl(),
      ToBecomeAnOfficer: new FormControl(),
      AreYouAnOfficer: new FormControl(),
      Team: new FormControl(),
      txnId: new FormControl('', Validators.required)
    });

    // Add a class to the body for styling purposes
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
  }

  ngAfterViewInit() {
    // Initialize noUiSlider once the view has been initialized
    const slider = document.getElementById('slider');
    if (slider) {
      noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      });
    } else {
      console.error('Slider element not found');
    }
  }

  onSubmit(formData: any) {
    console.log('Submit button clicked');

    if (this.formData.invalid) {
      console.log('Form validation failed');
      this.submitted = false;
      return;
    }

    this.submitted = true;

    const userEmailParams: any = {
      user_name: formData.fullName,
      user_email: formData.UTDEmail,
      message: "Thank you for signing up! We have received your details and will be in touch soon."
    };
  
    // Conditionally add fields based on user input
    if (formData.joinDate) {
      userEmailParams.user_joinDate = formData.joinDate;
    }
    if (formData.major) {
      userEmailParams.user_major = formData.major;
    }
    if (formData.phoneNumber) {
      userEmailParams.user_phone = formData.phoneNumber;
    }
    if (formData.ToLearnProgLanuages) {
      userEmailParams.user_learnProgramming = formData.ToLearnProgLanuages;
    }
    if (formData.Hackathons) {
      userEmailParams.user_hackathons = formData.Hackathons;
    }
    if (formData.Networking) {
      userEmailParams.user_networking = formData.Networking;
    }
    if (formData.ToBecomeAnOfficer) {
      userEmailParams.user_becomeOfficer = formData.ToBecomeAnOfficer;
    }
    if (formData.AreYouAnOfficer) {
      userEmailParams.user_isOfficer = formData.AreYouAnOfficer;
    }
    if (formData.Team) {
      userEmailParams.user_team = formData.Team;
    }
    if (formData.txnId) {
      userEmailParams.user_transactionId = formData.txnId;
    }
    // Send confirmation email to the user
    emailjs.send('service_kg6ypmk', 'template_iq1i60s', userEmailParams, 'y0P41lIpdxLOBTYzz')
      .then((response) => {
        console.log('User confirmation email sent!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error sending user confirmation email:', error);
      });

    // Prepare email parameters for admin notification email
    const adminEmailParams = {
      user_name: formData.fullName,
      user_email: formData.UTDEmail,
      user_joinDate: formData.joinDate,
      user_major: formData.major,
      user_phone: formData.phoneNumber,
      user_learnProgramming: formData.ToLearnProgLanuages,
      user_hackathons: formData.Hackathons,
      user_networking: formData.Networking,
      user_becomeOfficer: formData.ToBecomeAnOfficer,
      user_isOfficer: formData.AreYouAnOfficer,
      user_team: formData.Team,
      user_transactionId: formData.txnId,
      message: "New Registration",
      user_request: "Membership Request"
    };

    // Send admin notification email
    emailjs.send('service_kg6ypmk', 'template_k1rf4cl', adminEmailParams, 'y0P41lIpdxLOBTYzz')
      .then((response) => {
        console.log('Admin notification email sent!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error sending admin notification email:', error);
      });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
