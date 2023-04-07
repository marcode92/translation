import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechComponent } from './speech-component/speech-component.component';

const routes: Routes = [
  {path:'',component: SpeechComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
