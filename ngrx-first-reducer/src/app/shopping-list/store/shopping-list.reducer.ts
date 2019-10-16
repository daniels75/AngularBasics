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
        ingredients: state.ingredients.filter((ig, idx) => {
          return idx !== action.payload;
        })

      };
    case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,  // copy state
        ingredients: updatedIngredients
      };
    default:
      return state;
  }
}
