import React, { useReducer } from 'react';
import { Multipass } from 'multipass-js';
import './App.css';

enum ACTION_TYPES {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  TOGGLE_LOADING = 'TOGGLE_LOADING'
}

const initialState = {
  domain: 'admin-596.myshopify.com',
  key: '',
  redirect: '/account',
  data: JSON.stringify(
    {
      email: '',
      first_name: 'Sammy',
      last_name: 'Anand'
    },
    undefined,
    2
  ),
  url: ''
};

type State = typeof initialState;

type Action =
  | { type: ACTION_TYPES.CHANGE; payload: { field: string; value: string } }
  | { type: ACTION_TYPES.SUBMIT };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTION_TYPES.SUBMIT: {
      if (!state.domain || !state.data || !state.key) {
        alert('All fields are required.');
        return state;
      } else {
        let url;
        if (state.redirect) {
          url = new Multipass(state.key)
            .withCustomerData(JSON.parse(state.data))
            .withDomain(state.domain)
            .withRedirect(state.redirect)
            .url();
        } else {
          url = new Multipass(state.key)
            .withCustomerData(JSON.parse(state.data))
            .withDomain(state.domain)
            .withRedirect(state.redirect)
            .url();
        }
        return { ...state, url };
      }
    }
    default:
      return state;
  }
};

const t = {
  en: {
    domain: 'Shopify Store Domain',
    redirect: 'redirect',
    secret: 'Multipass Secret',
    customer: 'Customer Data',
    alert: 'Invalid Input Content',
    email: 'email is required.',
    button: 'Generate Mutipass URL',
    doc: 'Shopify multipass documentation'
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="container my-5">
        <form>
          <div className="form-group">
            <label htmlFor="domain">{t.en.domain}</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="redirect">{t.en.redirect}</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="secret">{t.en.secret}</label>
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
            <a
              href="https://shopify.dev/docs/admin-api/rest/reference/plus/multipass"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.en.doc}
            </a>
          </div>
          <div className="form-group">
            <label htmlFor="customer">{t.en.customer}</label>
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
              {t.en.email}
            </small>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTION_TYPES.SUBMIT });
            }}
            className="btn btn-primary"
          >
            {t.en.button}
          </button>
        </form>
      </div>
      <div className="container">
        <p>Multipass URL:</p>
        <a href={state.url} target="_blank" rel="noopener noreferrer">
          {state.url}
        </a>
      </div>
    </>
  );
}

export default App;
