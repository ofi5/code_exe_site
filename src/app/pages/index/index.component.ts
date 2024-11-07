import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import noUiSlider from "nouislider";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isScrolled = false; // Tracks if the navbar should be orange

  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    // Slider setup (noUiSlider)
    const slider = document.getElementById("sliderRegular");
    if (slider) {
      noUiSlider.create(slider, {
        start: 40,
        connect: false,
        range: {
          min: 0,
          max: 100
        }
      });
    }

    const slider2 = document.getElementById("sliderDouble");
    if (slider2) {
      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    }
  }

  // Detect scroll position and toggle the navbar color
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollOffset > 100; // Change color after scrolling 100px
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
