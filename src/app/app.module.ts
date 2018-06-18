import { ItemFactureRowComponent } from './components/item-facture-row/item-facture-row.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopMenuTransparentComponent } from './components/top-menu-transparent/top-menu-transparent.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PagesComponent } from './pages/pages.component';
import { ProfilCreatifComponent } from './pages/profil-creatif/profil-creatif.component';
import { ProfilClientComponent } from './pages/profil-client/profil-client.component';
import { CommunauteCreatifComponent } from './pages/creatifs/communaute-creatif/communaute-creatif.component';
import { NosCreationComponent } from './pages/nos-creation/nos-creation.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { LoginComponent } from './pages/login/login.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { RegisterCreatifComponent } from './pages/register-creatif/register-creatif.component';
import { MesprojetsComponent } from './pages/profil-client/mesprojets/mesprojets.component';
import { ProfilComponent } from './pages/profil-client/profil/profil.component';
import { FacturesComponent } from './pages/profil-client/factures/factures.component';
import { InfosComponent } from './pages/profil-client/infos/infos.component';
import { OffresComponent } from './pages/offres/offres.component';
import { ItemCreatifDefaultComponent } from './components/item-creatif-default/item-creatif-default.component';
import { ItemProjetTableRowComponent } from './components/item-projet-table-row/item-projet-table-row.component';
import { ProjetsComponent } from './pages/profil-creatif/projets/projets.component';
import { ProfilDefaultCreatifComponent } from './pages/profil-creatif/profil/profil.component';
import { InfosComponent as InfosComponentCreatif } from './pages/profil-creatif/infos/infos.component';
import { ItemProjetCreatifTableRowComponent } from './components/item-projet-creatif-table-row/item-projet-creatif-table-row.component';
import { ServiceTileItemComponent } from './components/service-tile-item/service-tile-item.component';
import { ItemCreationDefaultComponent } from './components/item-creation-default/item-creation-default.component';
import { CreatifsComponent } from './pages/creatifs/creatifs.component';
import { ConceptComponent } from './pages/concept/concept.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServicesComponent } from './pages/services/services.component';
import { BestcreatifComponent } from './pages/creatifs/bestcreatif/bestcreatif.component';
import { PartiperProjetComponent } from './pages/profil-creatif/partiper-projet/partiper-projet.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BandeServiceComponent } from './components/bande-service/bande-service.component';
import {
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatMenuModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatSidenavModule,
  MatCardModule
} from '@angular/material';
import { PostProjetComponent } from './pages/post-projet/post-projet.component';
import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { WaitingOverlayComponentComponent } from './components/dialogs/waiting-overlay-component/waiting-overlay-component.component';
import { WaitingOverlayServiceService } from './components/dialogs/waiting-overlay-service.service';
import { ApiServicesCrea911Service } from './services/api-services-crea911.service';
import { RegistrationSuccessComponent } from './components/dialogs/registration-success/registration-success.component';
import { ConfirmMailComponent } from './pages/confirm-mail/confirm-mail.component';
import { AuthClientServiceService } from './services/auth-client-service.service';
import { AuthCreatifServiceService } from './services/auth-creatif-service.service';
import { AuthCrea911Service } from './services/auth-crea911.service';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { TokenInterceptor } from './services/token.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TagInputModule } from 'ngx-chips';
import { MesCreationsComponent } from './pages/profil-creatif/mes-creations/mes-creations.component';
import { ItemMyCreaComponent } from './components/item-my-crea/item-my-crea.component';
import { DialogAddCreationComponent } from './dialogs/dialog-add-creation/dialog-add-creation.component';
import { StepOneComponent } from './pages/post-projet/step-one/step-one.component';
import { StepFinalComponent } from './pages/post-projet/step-final/step-final.component';
import { StepRecapComponent } from './pages/post-projet/step-recap/step-recap.component';
import { NgPipesModule } from 'angular-pipes';
import { PaginationPageServiceService } from './services/pagination-page-service.service';
import { DialogPreviewImageComponent } from './dialogs/dialog-preview-image/dialog-preview-image.component';
import { ImageViewerModule, ImageViewerConfig, IMAGEVIEWER_CONFIG, createButtonConfig } from '@hallysonh/ngx-imageviewer';
import { RegisterComponent } from './pages/register/register.component';
import { WebDeigitalComponent } from './pages/web-deigital/web-deigital.component';
import { RedactionComponent } from './pages/redaction/redaction.component';
import { DesignDespaceComponent } from './pages/design-despace/design-despace.component';
import { PrintPubComponent } from './pages/print-pub/print-pub.component';
import { IdentiteVisuelComponent } from './pages/identite-visuel/identite-visuel.component';
import { NgxCarouselModule } from 'ngx-carousel';
import { MotionDesignComponent } from './pages/motion-design/motion-design.component';
import { TypeProjetDialogComponent } from './pages/post-projet/type-projet-dialog/type-projet-dialog.component';
import { CreatifPortfolioComponent } from './pages/creatif-portfolio/creatif-portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TextMaskModule } from 'angular2-text-mask';
import { TruncatePipe } from './utils/truncate.pipe';
import { MoneyPipe } from './utils/money.pipe';

import { MomentModule } from 'ngx-moment';
import { BriefDialogViewComponent } from './components/dialogs/brief-dialog-view/brief-dialog-view.component';
import { EndActionDialogComponent } from './components/dialogs/end-action-dialog/end-action-dialog.component';
import { PasswordForgetComponent } from './pages/password-forget/password-forget.component';
import { DefineNewPasswordComponent } from './pages/define-new-password/define-new-password.component';
import { EditProjetComponent } from './pages/profil-client/edit-projet/edit-projet.component';
import { CountDownViewComponent } from './components/count-down-view/count-down-view.component';
import { PcardComponent } from './components/pcard/pcard.component';

const MY_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  zoomInButton: createButtonConfig('zoom_in', 'Zoom +', 1),
  zoomOutButton: createButtonConfig('zoom_out', 'Zoom -', 0),
  rotateLeftButton: createButtonConfig('rotate_left', 'Rotation gauche', 2),
  rotateRightButton: createButtonConfig('rotate_right', 'Rotation droite', 3),
  resetButton: createButtonConfig('autorenew', 'Réinitialiser', 4)
};

@NgModule({
  declarations: [
    AppComponent,
    TopMenuTransparentComponent,
    FooterComponent,
    TopMenuComponent,
    PagesComponent,
    ProfilCreatifComponent,
    ProfilClientComponent,
    CommunauteCreatifComponent,
    NosCreationComponent,
    AccueilComponent,
    LoginComponent,
    RegisterClientComponent,
    RegisterCreatifComponent,
    MesprojetsComponent,
    ProfilComponent,
    FacturesComponent,
    InfosComponent,
    OffresComponent,
    ItemFactureRowComponent,
    ItemCreatifDefaultComponent,
    ItemProjetTableRowComponent,
    ProjetsComponent,
    ProfilDefaultCreatifComponent,
    InfosComponentCreatif,
    ItemProjetCreatifTableRowComponent,
    ServiceTileItemComponent,
    ItemCreationDefaultComponent,
    CreatifsComponent,
    ConceptComponent,
    PortfolioComponent,
    ServicesComponent,
    BestcreatifComponent,
    PartiperProjetComponent,
    BandeServiceComponent,
    PostProjetComponent,
    WaitingOverlayComponentComponent,
    RegistrationSuccessComponent,
    ConfirmMailComponent,
    MesCreationsComponent,
    ItemMyCreaComponent,
    DialogAddCreationComponent,
    StepOneComponent,
    StepFinalComponent,
    StepRecapComponent,
    DialogPreviewImageComponent,
    RegisterComponent,
    WebDeigitalComponent,
    RedactionComponent,
    DesignDespaceComponent,
    PrintPubComponent,
    IdentiteVisuelComponent,
    MotionDesignComponent,
    TypeProjetDialogComponent,
    CreatifPortfolioComponent,
    ContactComponent,
    TruncatePipe,
    MoneyPipe,
    BriefDialogViewComponent,
    EndActionDialogComponent,
    PasswordForgetComponent,
    DefineNewPasswordComponent,
    EditProjetComponent,
    CountDownViewComponent,
    PcardComponent,
  ],
  imports: [
    MomentModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    OverlayModule,
    BrowserModule,
    AsyncLocalStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig,
      {
        useHash: false,
        enableTracing: false
      }
    ),
    NgPipesModule,
    ImageViewerModule,
    NgxCarouselModule,
    TextMaskModule
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    WaitingOverlayServiceService,
    ApiServicesCrea911Service,
    AuthCreatifServiceService,
    AuthClientServiceService,
    PaginationPageServiceService,
    AuthCrea911Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: MY_IMAGEVIEWER_CONFIG
    }
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    RegistrationSuccessComponent,
    WaitingOverlayComponentComponent,
    DialogAddCreationComponent,
    DialogPreviewImageComponent,
    StepRecapComponent,
    TypeProjetDialogComponent,
    BriefDialogViewComponent,
    EndActionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
