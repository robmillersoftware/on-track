export const margin = {
  top: 50,
  right: 85,
  bottom: 50,
  left: 85
};

// the height of this chart is constant, width is not
export const fullHeight = 380;
export const height = fullHeight - margin.top - margin.bottom;
// height of x axis
export const axisHeight = 38;

// number of weeks to expect in data (TODO: this should not be constant)
export const numWeeks = 20;

// default non-constant values
export const defaults = {
  fullWidth: 960,
  viewportSize: 6
};

const now = new Date(2017, 7, 29);
now.setHours(23);
now.setMinutes(59);
now.setSeconds(59);

export const today = new Date(now);
