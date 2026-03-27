import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profiles } from './profiles/profiles';
import { ProfileForm } from './profile-form/profile-form';
import { ChatBox } from './chat-box/chat-box';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    { path: 'profile', component: Profiles},
    { path: 'update', component: ProfileForm},
    { path: 'chat', component: ChatBox}
];
