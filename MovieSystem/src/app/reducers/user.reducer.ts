import { createReducer, on } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { addUser} from '../actions/user.actions';
import { UserData } from '../registration/registration.component';

export const initialState: UserData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  username: '',
  image: '',
  birthdate: '',
  role: 'user',
  _id: '',
};
export interface UserAction extends Actions {
   payload: UserData;
}
export const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => {
    return {
      firstname: action.user.firstname,
      lastname: action.user.lastname,
      email: action.user.email,
      password: action.user.password,
      username: action.user.username,
      image: action.user.image,
      _id: action.user._id,
      birthdate: action.user.birthdate,
    }; }));
