import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Tab3PageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        Tab3Page
    ]
})
export class Tab3PageModule { }
