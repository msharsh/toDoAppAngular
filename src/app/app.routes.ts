import { Routes } from '@angular/router';
import { AuthPage } from './auth/auth-page/auth-page';
import { ToDo } from './to-do/to-do';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'auth', component: AuthPage},
    { path: 'todolist', component: ToDo, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/todolist', pathMatch: 'full' },
];
