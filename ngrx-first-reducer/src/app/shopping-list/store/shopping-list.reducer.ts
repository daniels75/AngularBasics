import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from "./shoping-list.action";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,  // copy state
        ingredients: [...state.ingredients, action.payload] // then override what you want to change
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,  // copy state
        ingredients: [...state.ingredients, ...action.payload] // then override what you want to change
      };
    case ShoppingListActions.DELETE_INGREDIENTS:
      return {
        ...state,  // copy state
        ingredients: [...state.ingredients, action.payload] // then override what you want to change
      };
    case ShoppingListActions.UPDATE_INGREDIENTS:
      return {
        ...state,  // copy state
        ingredients: [...state.ingredients, action.payload] // then override what you want to change
      };
    default:
      return state;
  }
}
