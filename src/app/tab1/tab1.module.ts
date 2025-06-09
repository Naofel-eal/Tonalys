import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        Tab1Page
    ]
})
export class Tab1PageModule { }
