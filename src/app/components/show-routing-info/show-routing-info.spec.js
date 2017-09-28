import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as routingInfoActions from './show-routing-info.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Show routing info action creators', () => {
  const initialState = {
    routingInfo: {},
    isPasswordVerified: false
  };
  let store;

  beforeEach(() => {
    const state = {
      payload: {
        routingInfo: Object.assign({}, initialState)
      }
    };
    store = mockStore(state);
  });

  describe('`getRoutingInfo()`', () => {
    it('should dispatch a single action of proper type', () => {
      store.dispatch(routingInfoActions.getRoutingInfo(''));
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(typeof actions[0].payload).toEqual('object');
      expect(actions[0].type)
        .toEqual(routingInfoActions.SHOW_ROUTING_INFO);
    });

    it('should have routing info after call to store', () => {
      store.dispatch(routingInfoActions.getRoutingInfo());
      const actions = store.getActions();
      const { routingInfo } = actions[0].payload;
      expect(routingInfo.accountNumber).toEqual('0004104455147');
    });
  });
});
