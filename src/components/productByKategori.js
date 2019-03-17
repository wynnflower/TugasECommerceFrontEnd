import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import { urlApi } from '../support/urlAPI';

class ProductDetail extends React.Component{
    state={product:{}}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var idUrl=this.props.match.params.id
        Axios.get(urlApi+'/product?kategori='+idUrl)
        .then((res)=>{
            console.log(res)
            this.setState({product:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{ 
    return {
        id:state.user.id,
        nama: state.user.username,
        role:state.user.role
    }
}
export default connect(mapStateToProps) (ProductDetail)