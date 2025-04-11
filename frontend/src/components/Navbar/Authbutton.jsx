

const Authbutton = ({type, onLogin, onSignup, onLogout}) => {

    const handleClick = () => {
        switch (type) {
            case 'login':
                return onLogin?.();
            case 'signup':
                return onSignup?.();
            case 'logout':
                return onLogout?.();
        }
    };

    const labelMap = {
        login: 'Login',
        signip: 'Sign Up',
        logout: 'Logout'

    }

    return (
        <>
        <button onClick={handleClick}>
            {labelMap[type] || 'Auth'}
        </button>
        </>
    )
}


export default Authbutton