import { ProfilCreatifComponent } from './pages/profil-creatif/profil-creatif.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterCreatifComponent } from './pages/register-creatif/register-creatif.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilClientComponent } from './pages/profil-client/profil-client.component';
import { ProfilComponent as ProfilClient } from './pages/profil-client/profil/profil.component';
import { MesprojetsComponent as MesProjetsClient } from './pages/profil-client/mesprojets/mesprojets.component';
import { FacturesComponent as FacturesClientComponent } from './pages/profil-client/factures/factures.component';
import { InfosComponent as InfosClientComponent } from './pages/profil-client/infos/infos.component';
import { OffresComponent } from './pages/offres/offres.component';
import { ProfilDefaultCreatifComponent } from './pages/profil-creatif/profil/profil.component';
import { ProjetsComponent } from './pages/profil-creatif/projets/projets.component';
import { InfosComponent as InfosCreatifComponent } from './pages/profil-creatif/infos/infos.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CreatifsComponent } from './pages/creatifs/creatifs.component';
import { ConceptComponent } from './pages/concept/concept.component';
import { ServicesComponent } from './pages/services/services.component';
import { BestcreatifComponent } from './pages/creatifs/bestcreatif/bestcreatif.component';
import { CommunauteCreatifComponent } from './pages/creatifs/communaute-creatif/communaute-creatif.component';
import { PartiperProjetComponent } from './pages/profil-creatif/partiper-projet/partiper-projet.component';
import { PostProjetComponent } from './pages/post-projet/post-projet.component';
import { ConfirmMailComponent } from './pages/confirm-mail/confirm-mail.component';
import { AuthCreatifServiceService } from './services/auth-creatif-service.service';
import { AuthClientServiceService } from './services/auth-client-service.service';
import { MesCreationsComponent } from './pages/profil-creatif/mes-creations/mes-creations.component';
import { StepOneComponent } from './pages/post-projet/step-one/step-one.component';
import { StepFinalComponent } from './pages/post-projet/step-final/step-final.component';
import { StepRecapComponent } from './pages/post-projet/step-recap/step-recap.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrintPubComponent } from './pages/print-pub/print-pub.component';
import { DesignDespaceComponent } from './pages/design-despace/design-despace.component';
import { WebDeigitalComponent } from './pages/web-deigital/web-deigital.component';
import { IdentiteVisuelComponent } from './pages/identite-visuel/identite-visuel.component';
import { RedactionComponent } from './pages/redaction/redaction.component';
import { MotionDesignComponent } from './pages/motion-design/motion-design.component';
import { CreatifPortfolioComponent } from './pages/creatif-portfolio/creatif-portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PasswordForgetComponent } from './pages/password-forget/password-forget.component';
import { DefineNewPasswordComponent } from './pages/define-new-password/define-new-password.component';
import { EditProjetComponent } from './pages/profil-client/edit-projet/edit-projet.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'concept', component: ConceptComponent },
    { path: 'contact', component: ContactComponent },
    {
        path: 'creatifs',
        component: CreatifsComponent,
        children: [
            { path: '', redirectTo: 'communaute', pathMatch: 'full' },
            { path: 'communaute', component: CommunauteCreatifComponent },
            { path: 'bestcreatif', component: BestcreatifComponent },
            { path: 'offres-emplois', component: OffresComponent }
        ]
    },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'portfolio-creatif/:creatif', component: CreatifPortfolioComponent },


    { path: 'print-pub', component: PrintPubComponent },
    { path: 'design-espace', component: DesignDespaceComponent },
    { path: 'web-digital', component: WebDeigitalComponent },
    { path: 'identite-visuel', component: IdentiteVisuelComponent },
    { path: 'redaction', component: RedactionComponent },
    { path: 'motion-design', component: MotionDesignComponent },


    { path: 'connexion', component: LoginComponent },
    { path: 'mot-de-passe-oublier', component: PasswordForgetComponent },
    { path: 'reintialiser-mot-de-passe/:token', component: DefineNewPasswordComponent },
    { path: 'inscription-client', component: RegisterClientComponent },
    { path: 'inscription-creatif/:email', component: RegisterCreatifComponent },
    { path: 'inscription-creatif', component: RegisterCreatifComponent },
    { path: 'inscription', component: RegisterComponent },
    { path: 'inscription/:email', component: RegisterComponent },
    { path: 'confirmation/:token', component: ConfirmMailComponent },
    {
        path: 'profil-client',
        component: ProfilClientComponent,
        canActivate: [AuthClientServiceService],
        children: [
            { path: '', redirectTo: 'profil', pathMatch: 'full' },
            { path: 'profil', component: ProfilClient },
            { path: 'projets', component: MesProjetsClient },
            { path: 'factures', component: FacturesClientComponent },
            { path: 'offres', component: OffresComponent },
            { path: 'infos', component: InfosClientComponent },
            { path: 'edit-projet', component: EditProjetComponent }
        ]
    },
    {
        path: 'profil-creatif', 
        component: ProfilCreatifComponent,
        canActivate: [AuthCreatifServiceService],
        children: [
            { path: '', redirectTo: 'profil', pathMatch: 'full' },
            { path: 'profil', component: ProfilDefaultCreatifComponent },
            { path: 'projets', component: ProjetsComponent },
            { path: 'participer/:id', component: PartiperProjetComponent },
            { path: 'portfolio', component: MesCreationsComponent },
            { path: 'infos', component: InfosCreatifComponent }
        ]
    },
    {
        path: 'post-projet', 
        component: PostProjetComponent,
        canActivate: [AuthCreatifServiceService],
        children: [
            { path: '', redirectTo: 'step1', pathMatch: 'full' },
            { path: 'step1', component: StepOneComponent },
            { path: 'step2', component: StepFinalComponent },
            { path: 'stepfinal', component: StepFinalComponent },
        ]
    },
    { path: '**', redirectTo: 'connexion' }
]

