import {json, redirect} from 'react-router-dom';
import AuthForm from "../components/AuthForm";
import SuccessfulLogin from './SuccessfulLogin';

function AuthenticationPage(){
    return <AuthForm/>;
}
export default AuthenticationPage;

export async function action({request}){
	const searchParams=new URL(request.url).searchParams;
    const mode=searchParams.get('name');
    console.log(mode)

	const data= await request.formData();
	const authData={
		email: data.get('email'),
		password : data.get('password')
	}
    console.log('inside action funcctioon')
    console.log(authData);

    // now we've have all the data, and now we can send the request backend

    // fetch('http://localhost:8080/login'); // to respective route where we want to send the data
    // and we can swith between them using the mode variable. something like this ::
    // 
    // return redirect('/'); // remove it from here

    const response=await fetch("http://localhost:8080/login", {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(authData)
    }); 

    // console.log(response.text());
    // alert('successful login')
    if(response.status===422 || response.status===401){
        return response;
    }
    if(!response.ok){
        throw json({message : 'Couldn not authenticate user.'},{status : 500})
    }

    // if not errors, then on successful login we can redirect user to the problems_list page
    return redirect('/problems_list');
}