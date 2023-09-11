// import {useState} from 'react';
import {Form, NavLink} from 'react-router-dom'

function AuthForm(){
    // const [isLogin, setIsLogin] =useState(true);


    return(
        <>
            <div>
            <Form method="POST" action='/login'>
                <div>
                    <label htmlFor='email' >E-Mail</label>
                    <input id="email" type="email" name="email" required></input>
                </div>
                <div>
                    <label htmlFor='password' >Password</label>
                    <input id="password" type="password" name="password" required></input>
                </div>
                <div>
                    <button type='submit'>Log In</button>
                </div>
                
            </Form>
            </div>
            <hr/>
            <div>
                {/* <p>Create A New Account</p> */}
                Or <NavLink to="/signup">Create a New Account</NavLink>
            </div>
            <div>
                Made with ❤️
            </div>
        </>
    );
}

export default AuthForm;