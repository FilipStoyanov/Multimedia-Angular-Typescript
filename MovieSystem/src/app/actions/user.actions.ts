import { createAction, props } from '@ngrx/store';
import { UserData } from '../registration/registration.component';
export const addUser = createAction(
  'addUser',
  props<{user: UserData}>()) ;


export const addFriendList = createAction(
   'addFriends',
   props<{friends: string[]}>());

