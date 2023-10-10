// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

function reducer(
  state = {
    currentBtn: '',
    nodes: [],
    lines: [],
  },
  action,
) {
  let newState = {};
  Object.assign(newState, state);
  switch (action.type) {
    case 'changeCurrentBtn':
      newState.currentBtn = action.value;
      break;
    case 'setNodes':
      newState.nodes = action.value;
      break;
    case 'setLines':
      newState.lines = action.value;
      break;
    // default:
    //     return newState
  }
  return newState;
}

let store = configureStore({ reducer });
export default store;
