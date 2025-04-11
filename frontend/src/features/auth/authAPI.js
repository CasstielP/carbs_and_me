import API from '../../api'


export const loginAPI = async (credentials) => {
    const response = await API.post('/login', credentials);
    return response.data;
}

export const logoutAPI = async ()=> {
    await API.post('/logout')
}

export const refreshTokenAPI = async () => {
    const response = await API.post('/refresh')
    return response.data
}

export const signupAPI = async (userInfo) => {
    const response = await API.post('/users', userInfo)
    return response.data
}


  export const fetchUserProfileAPI = async () => {
    const response = await API.get('/me');
    return response.data;
  };
  