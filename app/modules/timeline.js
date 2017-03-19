import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';

const INITIAL_STATE = {
  activeSection: 0
};

export const SET_ACTIVE_TIMELINE_SECTION = 'shelfie/timeline/SET_ACTIVE_TIMELINE_SECTION';

export default createReducer(INITIAL_STATE, {
  [SET_ACTIVE_TIMELINE_SECTION]: (state, action) => {
    const newActiveSection = action.payload;
    return {
      ...state,
      activeSection: newActiveSection,
      previousSection: (
        newActiveSection !== state.previousSection
        ? state.activeSection
        : state.previousSection
      )
    };
  }
});


export const setActiveTimelineSection = createAction(SET_ACTIVE_TIMELINE_SECTION);

function local(state) {
  return state.timeline;
}

export function getActiveTimelineSection(state) {
  return local(state).activeSection;
}

export function getPreviousTimelineSection(state) {
  return local(state).previousSection;
}
