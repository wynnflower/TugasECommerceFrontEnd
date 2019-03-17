import React from 'react'
import Axios from 'axios'
import Product from './Product'
import Flash from './productFlash'
import Kategori from './kategori'

import Carousel from './carousel'
import{connect}from 'react-redux'
import {inputProduk} from './../1.actions'
import './../support/css/home.css'


class Home extends React.Component{
    state={listProduct:[],listKat:[]}
    componentDidMount(){
        this.getProduct()
        this.getCategory()
    }
    getProduct=()=>{
        Axios.get('http://localhost:2000/product')
        .then((res)=>{
            this.setState({listProduct:res.data})
            //alert(res.data[0].nama)
            //this.props.inputProduk(res.data)
            //this.props.inputProduk([this.state.listProduct.nama,this.state.listProduct.harga,this.state.listProduct.kategori,this.state.listProduct.link])
            }
        )
        .catch((err)=>console.log(err))  
    }
    getCategory=()=>{
        Axios.get('http://localhost:2000/tipekategori')
        .then((res)=>{
            console.log(res)
            this.setState({listKat:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderDropDown=()=>{
        var jsx=this.state.listKat.map((val)=>{
            return(
                <option>
                    {val.tipekat}
                </option>
            )
        })
        return jsx
    }
    renderProduct=()=>{
        var jsx=this.state.listProduct.map((val)=>{
            return(
                <div className="col-lg-4 produk mb-3">
                    <div className="card" style={{height:'350px'}}>
                        <div class="gradienteff">
                            <img className="card-img-top img img-1" src={val.link} alt={val.nama} style={{height:'150px'}} />
                        </div>
                        
                        <div className="diskon">{val.diskon}%</div>
                            <div className="kategori">{val.kategori}</div>
                        <div className="card-body">
                            <h5 className="card-title" style={{fontSize:'16px'}}>{val.nama}</h5>
                            <p className="card-text mr-3" style={{display:'inline',fontSize:'16px',textDecoration:'line-through',color:'red'}}>Rp. {val.harga}</p>
                            <p className="card-text" style={{display:'inline',fontSize:'16px'}}>Rp. {val.harga-(val.harga*val.diskon/100)}</p>
                            <div className="mt-3"><a href="#" className="btn btn-danger">Add to Cart</a></div>
                        </div>
                    </div>
                </div>    
            )
        })
        return jsx
    }
    renderProduct2=()=>{
        var jsx=this.state.inputProduk.map((val)=>{
            return(
                <div className="col-lg-4 produk mb-3">
                    <div className="card" style={{height:'350px'}}>
                        <img className="card-img-top" src={val.link} alt={val.nama} style={{height:'150px'}} />
                        <div className="card-body">
                            <h5 className="card-title" style={{fontSize:'16px'}}>{val.nama}</h5>
                            <p className="card-text" style={{fontSize:'16px'}}>Rp. {val.harga}</p>
                            <a href="#" className="btn btn-danger">Beli</a>
                        </div>
                    </div>
                </div>    
            )
        }
        )
        return jsx
    }
    
    selamatDatang=()=>{
        if(this.props.nama !==''){
            return <div>
                Selamat Datang {this.props.nama}
            </div>
        }
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    {/* <div className="col-lg-3 mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" placeholder="Cari Nama Produk"  />
                            <div className="input-group-append">
                                <button className="btn btn-info search" type="button" id="button-addon2" ><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Kategori</div>
                                <select className="form-control form-control-sm mb-2">
                                <option></option>
                                    {this.renderDropDown()}
                                </select>

                                <button className="btn btn-info search"><i class="fas fa-filter"></i> Search</button>                               
                            </form>

                        </div>
                        
                    </div> */}

                    {/* <div className="col-lg-9"> */}
                    <div className="col-lg-12">
                        <div className="my-4">
                            <Carousel />
                        </div>
                        {/* <div className="row">
                        {this.renderProduct()}
                        </div> */}
                        <Flash/>
                        <Kategori/>
                        <Product/>
                        <div>
                            {/* Tes: */}
                            {/* <div>{this.props.idproduk}</div>
                            <div>{this.props.namproduk}</div>
                            <div>{this.props.harga}</div>
                            <div>{this.props.kategori}</div>
                            <div>{this.props.gambar}</div> */}
                            {/* <div>{this.props.listproduk}</div> */}
                        </div>
                        {/* <div>{this.props.id}</div> */}
                        {/* <div>{this.props.nama}</div> */}
                        {/* <div>{this.selamatDatang()}</div> */}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{ 
    return {
        id:state.user.id,
        nama: state.user.username,
        listproduk:state.produk.listproduk,
        // idproduk: state.produk.id,
        // namaproduk: state.produk.nama,
        // harga: state.produk.harga,
        // kategori: state.produk.kategori,
        // gambar:state.produk.link,
        // error:state.produk.error,
        // loading:state.produk.loading
    }
}
export default connect(mapStateToProps,{inputProduk})(Home)