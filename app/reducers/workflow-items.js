import {List, Map} from 'immutable';
import * as types from '../constants/ActionTypes'

const initialState = List.of();

export function workflowItems(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
