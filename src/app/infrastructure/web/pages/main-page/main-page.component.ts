import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { addIcons } from 'ionicons';
import { musicalNoteOutline } from 'ionicons/icons';
import { ListAllScalesUseCase } from 'src/app/application/usecase/list-all-scales/list-all-scales.usecase';
import { Scale } from 'src/app/domain/model/scale';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    AsyncPipe,
  ],
})
export class MainPageComponent implements OnInit {
  scales: Observable<Scale[]> = of([]);

  constructor(private readonly listAllScales: ListAllScalesUseCase) {
    addIcons({ musicalNoteOutline });
  }

  ngOnInit(): void {
    this.scales = this.listAllScales.execute();
  }

  getScalesNotes(scale: Scale): string {
    return scale.notes.map((n) => n.name).join(' - ');
  }
}
