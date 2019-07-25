import { getFaqGroupAPI, getFaqGroupContentAPI } from '@/api';

export const GET_FAQ_GROUPS_FAILED = 'get-faq-groups-failed';
export const GET_FAQ_GROUPS_REQUEST = 'get-faq-groups-request';
export const GET_FAQ_GROUPS_SUCCESS = 'get-faq-groups-success';
export const GET_FAQ_GROUP_CONTENT_FAILED = 'get-faq-group-content-failed';
export const GET_FAQ_GROUP_CONTENT_REQUEST = 'get-faq-group-content-request';
export const GET_FAQ_GROUP_CONTENT_SUCCESS = 'get-faq-group-content-success';

export function getFaqGroupsRequest() {
  return {
    type: GET_FAQ_GROUPS_REQUEST,
    payload: {},
  };
}

export function getFaqGroupsSuccess(data) {
  return {
    type: GET_FAQ_GROUPS_SUCCESS,
    payload: { data },
  };
}

export function getFaqGroupsFailed() {
  return {
    type: GET_FAQ_GROUPS_FAILED,
    payload: {},
  };
}

export function getFaqGroups() {
  return (dispatch) => {
    dispatch(getFaqGroupsRequest());
    return getFaqGroupAPI()
      .then(({ data }) => {
        dispatch(getFaqGroupsSuccess(data));
      })
      .catch(() => dispatch(getFaqGroupsFailed()));
  };
}

export function getFaqGroupContentRequest() {
  return {
    type: GET_FAQ_GROUP_CONTENT_REQUEST,
    payload: {},
  };
}

export function getFaqGroupContentFailed() {
  return {
    type: GET_FAQ_GROUP_CONTENT_FAILED,
    payload: {},
  };
}

export function getFaqGroupContentSuccess(id, content) {
  return {
    type: GET_FAQ_GROUP_CONTENT_SUCCESS,
    payload: { id, content },
  };
}

export function getFaqGroupContent(id) {
  return (dispatch) => {
    dispatch(getFaqGroupContentRequest());
    return getFaqGroupContentAPI(id)
      .then(({ data }) => {
        const content = JSON.parse(data.content);
        dispatch(getFaqGroupContentSuccess(id, content));
      })
      .catch(() => dispatch(getFaqGroupContentFailed()));
  };
}
