import React, { useReducer, useState } from 'react';
import { Multipass } from 'multipass-js';

enum ACTION_TYPES {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  TOGGLE_LOADING = 'TOGGLE_LOADING'
}

const initialState = {
  domain: 'xxx.myshopify.com',
  key: '',
  redirect: '/',
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
        alert('全項目は必須です。All fields are required.');
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
  },
  ja: {
    domain: 'Shopify ドメイン',
    redirect: 'リダイレクト',
    secret: 'マルチパス シークレット',
    customer: '顧客データ',
    alert: '入力項目チェックしてください。',
    email: 'emailは必須。',
    button: 'マルチパス用のURL生成',
    doc: 'Shopify マルチパスドキュメント'
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isJa, setIsJa] = useState(
    !new URLSearchParams(window.location.search).get('lang')
  );
  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          onClick={() => setIsJa(true)}
          className={`btn ${isJa ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          日本語
        </button>
        <button
          type="button"
          onClick={() => setIsJa(false)}
          className={`btn ${isJa ? 'btn-outline-warning' : 'btn-warning'}`}
        >
          English
        </button>
      </div>
      <div className="container my-5">
        <form>
          <div className="form-group">
            <label htmlFor="domain">{isJa ? t.ja.domain : t.en.domain}</label>
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
            <label htmlFor="redirect">{isJa ? t.ja.redirect : t.en.redirect}</label>
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
            <label htmlFor="secret">{isJa ? t.ja.secret : t.en.secret}</label>
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
              {isJa ? t.ja.doc : t.en.doc}
            </a>
          </div>
          <div className="form-group">
            <label htmlFor="customer">{isJa ? t.ja.customer : t.en.customer}</label>
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
              {isJa ? t.ja.email : t.en.email}
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
            {isJa ? t.ja.button : t.en.button}
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
