import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import {ADD_INGREDIENT} from "./shoping-list.action";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,  // copy state
        ingredients: [...state.ingredients, action] // then override what you want to change
      };
  }
}
