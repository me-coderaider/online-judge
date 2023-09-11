// import {useState} from 'react';
import {Form, NavLink} from 'react-router-dom'

function AuthFormSignUp(){
    // const [isLogin, setIsLogin] =useState(true);


    return(
        <>
            <div>
            <Form method="POST" action='/signup'>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text' name='name'></input>
                </div>

                <div>
                    <label htmlFor='email' >E-Mail</label>
                    <input id="email" type="email" name="email" required></input>
                </div>
                <div>
                    <label htmlFor='password' >Password</label>
                    <input id="password" type="password" name="password" required></input>
                </div>
                <div>
                    <button type='submit'>Sign Up</button>
                </div>
                
            </Form>
            </div>
        </>
    );
}

export default AuthFormSignUp;