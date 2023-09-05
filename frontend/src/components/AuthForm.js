import {useState} from 'react';
import {Form} from 'react-router-dom'

function AuthForm(){
    // const [isLogin, setIsLogin] =useState(true);


    return(
        <>
            <div>
            <Form method="POST" >
                <p>
                    <label htmlFor='email' >Email</label>
                    <input id="email" type="email" name="email" required></input>
                </p>
                <p>
                    <label htmlFor='image' >Password</label>
                    <input id="password" type="password" name="password" required></input>
                </p>
                <div>
                    <button>Log In</button>
                </div>
                
            </Form>
            </div>
            <hr/>
            <div>
                <p>Create A New Account</p>
            </div>
            <div>
                Made with ❤️
            </div>
        </>
    );
}

export default AuthForm;