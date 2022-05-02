import { createReducer, on } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { addUser} from '../actions/user.actions';
import { UserData } from '../registration/registration.component';

export const initialState: UserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  username: '',
  image: '',
  id: '',
};
export interface UserAction extends Actions {
   payload: UserData;
}
export const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => {
    return {
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      email: action.user.email,
      password: action.user.password,
      username: action.user.username,
      image: action.user.image,
      id: action.user.id,
    }; }));
