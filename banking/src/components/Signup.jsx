import './Signup.css'

const Signup = () => {
    return(
        <div className='signup-main-page'>
            <div className='signup-form-container'>
                <h2 className='signup-intro'>Create an Account</h2>
                <div className='signup-form-container'>
                    <form className='signup-form'>
                        <div className='signup-username-container'>
                            <label htmlFor="signup-username">Username</label>
                            <input type="text" id='signup-username' name='signup-username'/>
                        </div>
                        <div className='signup-password-container'>
                            <label htmlFor="signup-passoword">Password</label>
                            <input type="text" id='signup-password' name='signup-password'/>
                        </div>
                        <button className='login-button'>Sign Up</button>
                        <div className='login-question'>
                            <p>Already have an account?</p>
                            <button>Login here</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup