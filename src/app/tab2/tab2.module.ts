import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Tab2PageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        Tab2Page
    ]
})
export class Tab2PageModule { }
