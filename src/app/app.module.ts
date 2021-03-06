import { ModalCambiarClaveModule } from './componentes/modals/modal-cambiar-clave/modal-cambiar-clave.module';
import { CustomPaginator } from './clases/custom-paginator';
import { ComponentesModule } from './componentes/componentes.module';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule,
  MatDialogRef,
  MatPaginatorIntl
  
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Layout
import { PreloaderDirective } from './layout/preloader.directive';
// Header
import { AppHeaderComponent } from './layout/header/header.component';
// Sidenav
import { AppSidenavComponent } from './layout/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './layout/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './layout/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Customizer
import { AppCustomizerComponent } from './layout/customizer/customizer.component';
import { ToggleQuickviewDirective } from './layout/customizer/toggle-quickview.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';
// Search Overaly
import { AppSearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './layout/search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './layout/search-overlay/open-search-overlay.directive';

// Pages
// import { DashboardComponent } from './dashboard/dashboard.component';
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';

// Sub modules
import { SharedModule } from './shared/shared.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthGuard, AuthenticationService, HttpMethodService, ControlsService } from './shared';

import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './controls/spinner/spinner.component';

import { ComponentesComponent } from './componentes/componentes.component';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
import { RkmessagesModule } from './componentes/rkmain/rkmessages/rkmessages.module';
import { InfoModule } from './componentes/rkmain/info/info.module';
import { ConfirmationModule } from './controls/confirmation/confirmation.module';
import { AddrkaModule } from './componentes/rkmain/addrka/addrka.module';


import { FilterdataPipe } from './filterdata.pipe';
import { LeyendaModule } from './leyenda/leyenda.module';
import { RkhelpComponent } from './rkmain/rkhelp/rkhelp.component';

// import { RkhelpComponent } from './rkhelp/rkhelp.component';
import { rkHelpModule } from './rkmain/rkhelp/rkhelp.module';
import { CajasdashboardComponent } from './rkmain/cajasdashboard/cajasdashboard.component';
import { CajaslinkComponent } from './cajaslink/cajaslink.component';
import { ChartsModule } from './charts/charts.module';




@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    // Sub modules
    // PlanEntrenamientoModule,
    ComponentesModule,
    SharedModule,
    ModalCambiarClaveModule,
    RkmessagesModule,
    InfoModule,
    ConfirmationModule,
    AddrkaModule,
    rkHelpModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circleSwish}),
    ReactiveFormsModule,
    
    
    
  ],
  declarations: [
    AppComponent,
    // Layout
    // PlanEntrenamientoComponent,
    PreloaderDirective,
    // Header
    AppHeaderComponent,
    // Sidenav
    AppSidenavComponent,
    ToggleOffcanvasNavDirective,
    AutoCloseMobileNavDirective,
    AppSidenavMenuComponent,
    AccordionNavDirective,
    AppendSubmenuIconDirective,
    HighlightActiveItemsDirective,
    // Customizer
    AppCustomizerComponent,
    ToggleQuickviewDirective,
    // Footer
    AppFooterComponent,
    // Search overlay
    AppSearchOverlayComponent,
    SearchOverlayDirective,
    OpenSearchOverlaylDirective,
    //
    // DashboardComponent,
    // Pages
    PageLayoutFullscreenComponent,
    SpinnerComponent,
    ComponentesComponent,
    
    
    FilterdataPipe,
    
    
    // CajaslinkComponent,
    
    
    // CajasdashboardComponent,

    
    
    
    
    
    
    
    
    
 
    
    
    
    
    
  ],
  providers: [AuthGuard, AuthenticationService, HttpMethodService, ControlsService,
              { provide: MatPaginatorIntl, useClass: CustomPaginator}],
  bootstrap: [AppComponent],
  entryComponents: [ SpinnerComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
