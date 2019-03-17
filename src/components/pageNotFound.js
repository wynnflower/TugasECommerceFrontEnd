import React from 'react'
//import './../support/colorlib-error-404-3/css'
import './../support/css/pageNotFound.css'

class PageNotFound extends React.Component{
    render(){
        return(
            <div>
                <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                </div>
                </div>

            </div>
        )
    }
}
export default PageNotFound