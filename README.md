## fluxxor-wrapper

[![npm version](https://badge.fury.io/js/fluxxor-wrapper.svg)](https://badge.fury.io/js/fluxxor-wrapper)

A hoc try to implement both `FluxMixin` and `StoreWatchMixin` of [fluxxor](https://github.com/BinaryMuse/fluxxor). This project is inspired by this [PR](https://github.com/BinaryMuse/fluxxor/pull/117) proposed by [BinaryMuse](https://github.com/BinaryMuse).

### What is hoc?

It is the abbreviation of [Higher-order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775).

### Why replace mixins with hoc ?

There are lots of articles about the topic. If you never heard of hoc, or you are not sure if hoc is what you need. In both conditions, you should have a look at the articles below at least before using it.

- [Mixins are dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.j35u1z53y)
- [Mixins considered harmful](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)

### Install

`npm install --save fluxxor-wrapper`

### Getting started

First of all you need to remove your legacy mixin-style. Don't forget to remove `getStateFromFlux` method in root component. 

The main and only API:

```js
fluxxorWrapper(
  component: React component,
  flux: flux instance,
  stores: array of store,
  props: object or function returning states,
);  
```

A simple example:

```js
const fluxxorWrapper = require('fluxxor-wrapper');

const stores = {
  storeA: new StoreA.store(),
  storeB: new StoreB.store(),
}; 

const actions = {
  actionA() {
        this.dispatch('WHATEVER', { key: value })
  },
};

const flux = new Fluxxor.Flux(
  stores,
  actions,
);

const fluxxorProps = (flux) => {
  return {
    statesInStoreA: flux.store("storeA").getState(),
    statesInStoreB: flux.store("storeB").getState(), 
  };
};

const WrappedComponent = fluxxorWrapper(
  myComponent,
  flux,
  ["storeA", "storeB"],
  fluxxorProps
);
```

Now you are good.

#### FluxMixin

[FluxMixin](https://github.com/BinaryMuse/fluxxor/blob/master/lib/flux_mixin.js) mainly do two things:

- Use [context](https://facebook.github.io/react/docs/context.html) to pass flux automatically through a tree
- Make you access flux by `this.getFlux()`

On the purpose of performance and making data explicit. I am not going to support the feature anymore. Instead I pass flux as a props to `myComponent`, you can get flux by `this.props.flux` in myComponent now.

#### StoreWatchMixin

[StoreWatchMixin](https://github.com/BinaryMuse/fluxxor/blob/master/lib/store_watch_mixin.js) mainly do two things:

- Add/remove event listener to the event "change" in componentDidMount for every stores you register. 
- Fetch states from stores you register to the top component by the method `getStateFromFlux`. 

We can get the states you declare in your stores from props. Now we can get `statesInStoreA` and `statesInStoreB` in myComponent.props.

### Test

TO BE DONE

### Contributing

I am glad you like this package, and hope it could help you and save your time. PR and advices are welcome. If you have questions, please fire a issue or send me an email.

### Lisence

Check lisence [here](https://github.com/frozenfung/fluxxor-wrapper/blob/master/LICENSE).
