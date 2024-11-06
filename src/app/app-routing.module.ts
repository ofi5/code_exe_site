import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/site/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/site/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/site/landingpage/landingpage.component";
import { EventpageComponent } from './pages/site/eventpage/eventpage.component';
import { ContactusComponent } from "./pages/site/contactus/contactus.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },  // Redirect root to profile
  { path: "home", component: IndexComponent },
  // { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  // { path: "landing", component: LandingpageComponent },
  { path: "event", component: EventpageComponent },
  { path: "contactus", component: ContactusComponent },
  { path: "**", redirectTo: "home" }  // Wildcard route to handle unknown paths
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,               // Ensures client-side routing works on GitHub Pages
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      enableTracing: false
    })
  ],
  exports: []
})
export class AppRoutingModule {}
