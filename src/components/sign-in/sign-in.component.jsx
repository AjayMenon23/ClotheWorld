import React from 'react';
import './sign-in.component.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email : '',
            password:''
        }
    }


    handleSubmit =event =>{
        event.preventDefault();
        this.setState({email:'',password:''})
    }


    handleChange =event=>{
        const{value,name}=event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email id</span>

                <form onSubmit={this.handleSubmit}> 
                    <FormInput name="Email" label="Email" value={this.state.email} handleChange={this.handleChange} required/>
                    <FormInput name="Password" label="Password" type="password" value={this.state.password} handleChange={this.handleChange} required/>
                    <CustomButton type="submit">Sign In</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;