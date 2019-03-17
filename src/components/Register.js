import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {userRegister} from './../1.actions'
import Loader from 'react-loader-spinner'


class Register extends React.Component{
    state={error:''} // untuk proteksi
    componentWillReceiveProps(newProps){// kalau nilai errornya ganti
        if(newProps.error!==''){
            this.setState({error:newProps.error})
        }
    }
    renderErrorMessage=()=>{// untuk menampilkan error message
        if (this.state.error !==''){
            return <div className="alert alert-danger mt-3" style={{textAlign:'center'}} role="alert">
            {this.state.error}
            </div>
        } else if (this.props.error !==''){
            return <div className="alert alert-danger mt-3" style={{textAlign:'center'}} role="alert">
            {this.props.error}
            </div>
        }
    }
    renderLoaderOrBtn=()=>{
        if(this.props.loading===true){
            return(
                <Loader 
                   type="Plane"
                   color="#00BFFF"
                   height="50"	
                   width="50"
                />   
               )
        } else{
           return <button type="button" className="btn btn-primary" onClick={this.onBtnRegisterClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Register</button>
        }
    }
    
    onBtnRegisterClick=()=>{
        var username=this.refs.username.value
        var password=this.refs.password.value
        var email=this.refs.email.value
        var phone=this.refs.phone.value
        //bikin proteksi pake state error
        if(username===''||password===''||email===''||phone===''){
            this.setState({error:'Semua Field harus diisi'})
        } else{
            this.setState({error:''})
            this.props.userRegister(username,password,email,phone)
        }

    }
    render(){
        if(this.props.user!==""){
            return(<Redirect to="/"/>)
        }
        return(
            <div className="container myBody " style={{minHeight:"600px"}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                        
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                            <fieldset>
                                
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Username</label>
                                    <div className="col-sm-9">
                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Password</label>
                                    <div className="col-sm-9">
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Phone</label>
                                    <div className="col-sm-9">
                                    <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-12">
                                    {/* <button type="button"    className="btn btn-primary" style={{width:"300px"}} onClick={this.onBtnRegisterClick} ><i className="fas fa-sign-in-alt" /> Sign Up!</button> */}
                                    <div>{this.renderLoaderOrBtn()}</div>
                                    <div>{this.renderErrorMessage()}</div>
                                    </div>
                                        
                                </div>
                                <div className="btn my-auto"><p>Already have Account? <Link to="/login" className="border-bottom">Login</Link></p></div>
                                
                            </fieldset>
                        </form>
                        
                    </div>                
                </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user.username,
        loading:state.user.loading,
        error:state.user.error
    }
}

export default connect(mapStateToProps,{userRegister})(Register)