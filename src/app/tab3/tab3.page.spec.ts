import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab3Page } from './tab3.page';
import { IonicModule } from '@ionic/angular';

describe('Tab3Page', () => {
    let component: Tab3Page;
    let fixture: ComponentFixture<Tab3Page>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), Tab3Page]
}).compileComponents();

        fixture = TestBed.createComponent(Tab3Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
