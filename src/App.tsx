import React, { useReducer } from 'react';
import { Multipass } from 'multipass-js';

enum ACTION_TYPES {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  TOGGLE_LOADING = 'TOGGLE_LOADING'
}

const initialState = {
  domain: 'xxx.myshopify.com',
  key: '',
  redirect: '/pages/multipass-test',
  data: JSON.stringify(
    {
      email: 'aaa@aaa.com',
      tag_string: 'multipass',
      first_name: 'TEST',
      last_name: 'TEST',
      addresses: [
        {
          address1: '123 Oak St',
          city: 'Ottawa',
          country: 'Canada',
          first_name: 'TEST',
          last_name: 'TEST',
          phone: '555-1212',
          province: 'Ontario',
          zip: '123 ABC',
          province_code: 'ON',
          country_code: 'CA',
          default: true
        }
      ]
    },
    undefined,
    2
  ),
  url: '',
  loading: false
};

type State = typeof initialState;

type Action =
  | { type: ACTION_TYPES.CHANGE; payload: { field: string; value: string } }
  | { type: ACTION_TYPES.SUBMIT }
  | { type: ACTION_TYPES.TOGGLE_LOADING };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTION_TYPES.SUBMIT:
      const url = new Multipass(state.key)
        .withCustomerData(JSON.parse(state.data))
        .withDomain(state.domain)
        .withRedirect(state.redirect)
        .url();
      console.log(url);
      return { ...state, loading: false, url };
    case ACTION_TYPES.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div className="container my-5">
        <form>
          <div className="form-group">
            <label htmlFor="domain">Shopify Store Domain</label>
            <input
              type="input"
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.CHANGE,
                  payload: { field: e.target.id, value: e.target.value }
                })
              }
              value={state.domain}
              id="domain"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="redirect">redirect</label>
            <input
              type="input"
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.CHANGE,
                  payload: { field: e.target.id, value: e.target.value }
                })
              }
              value={state.redirect}
              id="redirect"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Muliplepass Token</label>
            <input
              type="input"
              value={state.key}
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.CHANGE,
                  payload: { field: e.target.id, value: e.target.value }
                })
              }
              id="key"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your input with anyone e.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Customer Data</label>
            <textarea
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.CHANGE,
                  payload: { field: e.target.id, value: e.target.value }
                })
              }
              id="data"
              rows={6}
              value={state.data}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTION_TYPES.TOGGLE_LOADING });
              dispatch({ type: ACTION_TYPES.SUBMIT });
            }}
            className="btn btn-primary"
          >
            {state.loading ? '生成中' : 'Generate'}
          </button>
        </form>
      </div>
      <div className="container">
        <p>Muliplepass URL:</p>
        <a href={state.url} target="_blank" rel="noopener noreferrer">
          {state.url}
        </a>
      </div>
    </>
  );
}

export default App;
