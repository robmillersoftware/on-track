# ESDoc Reference

The JavaScript source code for this project should be documented using ESDoc
style comments and documentation tags.

Example:

```javascript
/**
 * This is the simplest esdoc comment - just a description.
 */

 /**
  * This is an esdoc comment with a tag.
  * @param {number} x The `x` value of something.
  */
```

> See the [ESDoc tags reference](https://esdoc.org/manual/usage/tags.html) for
additional info.

Below are the basic conventions for documenting the CFI source code.

## Documenting a Component

Container component controllers are the bulk of the effort here. Presentational
(aka "dumb") components will require very few comments.

### The Component Definition

Write a description for the component definition object. Optionally provide
comments for each binding.

In complex cases, such as interrelated or composite components, it may be
appropriate to provide an `@example` of usage.

```javascript
import template from './awesome.html';

/**
 * Describe the component in a way that reflects its usage in the UI of the
 * application. If it's a container, indicate this fact and describe the
 * piece of the application component tree that it contains. If it's a child,
 * describe it's intended relationship to a parent.
 */
export const awesomeComponent = {
  template,
  bindings: {
    sauce: '<',
    title: '@',
    onAwesome: '&'
  }
};
```

### The Controller

Write a header comment for the class, the constructor, and each method,
including the lifecycle hooks (although these can be very brief).

```javascript
/**
 * A brief description of the controller from a responsibilities pov.
 */
class AwesomeController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} ngRedux The `ngRedux` state container service.
   * @param {Object} ActionsService Service containing redux actions used by
   *  this component.
   */
  constructor(ngRedux, ActionsService) {
    this.store = ngRedux;
    this.actions = ActionsService;
  }

  /**
   * Connects component to the redux store.
   */
  $onInit() {
    this.store.connect(...);
  }

  // ...

  /**
   * Describe what this method does and whether or not it has side effects,
   * can raise exceptions, what it's params are, and what it returns.
   * @param {string|number} [something=0] A param that can be a
   *  string or number and that has a default value.
   * @return {boolean} A boolean value, just because.
   */
  someCustomMethod(something = 0) {
    // this is a weird example
  }
}
```

### The Module

One comment will generally be sufficient.

```javascript
import angular from 'angular';
import { awesomeComponent } from './awesome.component';

/**
 * Describe the scope of the module, including its children, and possibly name
 * its dependencies.
 * May use @link tag to connect with other modules. E.g., {@link MyOtherThing}
 */
export const awesome = angular.module('module.name.here', [])
  .component('awesome', awesomeComponent);
```

## Documenting Actions and Reducers

### Action Constants

Action constants ought to be documented with a straightforward description.

```javascript
/**
 * Represents requesting activity data for the current account.
 */
export const ACTIVITY_FETCH = 'ACTIVITY_FETCH';
/**
 * Account activity request succeeds.
 */
export const ACTIVITY_FETCH_SUCCESS = 'ACTIVITY_FETCH_SUCCESS';
/**
 * Account activity request fails.
 */
export const ACTIVITY_FETCH_FAILURE = 'ACTIVITY_FETCH_FAILURE';
```

### Action Creator Service

Async action creators don't need param tags for the inner function, however,
do indicate that they are async.

```javascript
/**
 * Contains action creators related to account activity.
 * @param {Object} ActivityService The account activity domain service.
 */
export const ActivityActions = (ActivityService) => {
  'ngInject';

  /**
   * Async action creator that requests account activity data while dispatching
   * `ACTIVITY_FETCH`.
   */
  const fetchActivity = () => (dispatch, getState) => {
    // things happen here...
  };

  /**
   * Dispatches `ACTIVITY_SORT_CHANGE` action.
   * @param {string} criteria The new sort criteria state.
   */
  const sortActivity = criteria => ({
    type: ACTIVITY_SORT_CHANGE,
    payload: criteria
  });
};
```

### Reducers

The reducer function should have a description comment explaining the scope of
the reducer cases it defines. In the example below that scope is the
changing of state for the account activity branch of app state.

Reducer cases should have little or no logic and be more or less
self-documenting.

```javascript
import * as actions from './activity.actions';

const initialState = {
  fetching: false,
  showing: 40
};

/**
 * Specifies how the account activity state changes in response to actions.
 * @param {Object} [state=initialState] The current application state, or
 *  initial state.
 * @param {Object} action An object representing the current action.
 */
export const activity = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ACTIVITY_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ACTIVITY_FETCH_SUCCESS:
      return Object.assign({}, state, { fetching: false }, payload);

    default:
      return state;
  }
};
```

## Running and Testing the Documentation

From the project root directory run `npm run docs` to generate the static
documentation website. The files will be created in the `esdoc/` directory.

To view the docs open `esdocs/index.html` in a browser straight from file
system.

From the top nav go to the Sources section to view the docs coverage for all
files. Here you will see if your source files are lacking sufficient
documentation.
