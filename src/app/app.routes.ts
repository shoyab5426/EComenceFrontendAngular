import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ChatComponent } from './chatBaot/chat/chat.component';

export const routes: Routes = [
    
    { path:"", component:LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'dashboard/chat', component: ChatComponent, canActivate: [authGuard] },
];
