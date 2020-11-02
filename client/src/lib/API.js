import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    create: function (email, password) {
      return axios.post('/api/users', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Calendar:{
    getCalendar: function (authToken, week, day){
      return axios.get(`/api/calendar/${week}/${day}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

    },
    setData: function (authToken,type,number){
      return axios.put('/api/calendar',
      {
        type:type,
        number:number
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    }
  }
}
