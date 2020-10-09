# the demo to implement multipass

```
yarn add multipass-js
```

```ts
import { Multipass } from "multipass-js"

const SHOPIFY_STORE_MULTIPASS_SECRET = 'xxx'; // GET from admin page setting => checkout => enable Multipass loginultip
const multipass = new Multipass(SHOPIFY_STORE_MULTIPASS_SECRET);

// Create your customer data hash
const customerData = {
    //user: "your database user id",
    //customer: "any custom data you want",
    //identifier: "bob123",
    //remote_ip: "107.00.000.000",
    //return_to: "http://yourstore.com/some_specific_site",
    // ...
    email: 'bob@bob.com',
    created_at: '2013-04-11T15:16:23-04:00',
    first_name: 'Bob',
    last_name: 'Bobsen',
    tag_string: 'canadian, premium',
    addresses: [
      {
        address1: '123 Oak St',
        city: 'Ottawa',
        country: 'Canada',
        first_name: 'Bob',
        last_name: 'Bobsen',
        phone: '555-1212',
        province: 'Ontario',
        zip: '123 ABC',
        province_code: 'ON',
        country_code: 'CA',
        default: true
      }
    ]
};

const url = multipass
  .withCustomerData(customerData)
  .withDomain('xxxxx.myshopify.com/')
  .withRedirect('/products/adidas-smith')
  .url();

console.log(url);
// https://xxx.myshopify.com//account/login/multipass/[LONG_LONG_STRING]


// client may access shopify with `url`
// will give you URL like:  https://store.myshopify.com/account/login/multipass/<MULTIPASS-TOKEN>
// with optional redirection
```
