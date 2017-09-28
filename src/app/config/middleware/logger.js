import { createLogger } from 'redux-logger';

const logger = createLogger({
  duration: true,
  collapsed: (getState, action, logEntry) => !logEntry.error,
  logger: console
});

export default logger;
