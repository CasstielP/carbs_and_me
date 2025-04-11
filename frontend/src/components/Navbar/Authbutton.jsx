import React from 'react';

const AuthButton = ({ type, onClick }) => {
  const labelMap = {
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
  };

  return (
    <button onClick={onClick}>
      {labelMap[type] || 'Auth'}
    </button>
  );
}

export default AuthButton;
