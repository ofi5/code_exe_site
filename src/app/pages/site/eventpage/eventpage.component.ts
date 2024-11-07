import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-eventpage",
  templateUrl: "eventpage.component.html",
  styleUrls: ["eventpage.component.scss"]
})
export class EventpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isScrolled = false; // Track scroll state

  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("event-page");

    // Initialize the chart only if the canvas element is found
    const canvas: any = document.getElementById("chartBig");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
      gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
      gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["JUN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [{
            label: "Data",
            fill: true,
            backgroundColor: gradientFill,
            borderColor: "#e44cc4",
            borderWidth: 2,
            pointBackgroundColor: "#e44cc4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#be55ed",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [80, 160, 200, 160, 250, 280, 220, 190, 200, 250, 290, 320]
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: { display: false },
          tooltips: {
            backgroundColor: "#fff",
            titleFontColor: "#ccc",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          responsive: true,
          scales: {
            yAxes: [{
              barPercentage: 1.6,
              gridLines: { drawBorder: false, color: "rgba(0,0,0,0.0)", zeroLineColor: "transparent" },
              ticks: { display: false, suggestedMin: 0, suggestedMax: 350, padding: 20, fontColor: "#9a9a9a" }
            }],
            xAxes: [{
              barPercentage: 1.6,
              gridLines: { drawBorder: false, color: "rgba(0,0,0,0)", zeroLineColor: "transparent" },
              ticks: { padding: 20, fontColor: "#9a9a9a" }
            }]
          }
        }
      });
    }
  }

  // Listener for window scroll to toggle isScrolled
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollOffset > 60; // Update background color after scrolling 60px
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("event-page");
  }
}
