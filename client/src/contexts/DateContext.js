import React from 'react';

const DateContext = React.createContext({
  week:undefined,
  day: undefined,
  setWeek: ()=> undefined,
  setDate: ()=> undefined
});

export default DateContext;
