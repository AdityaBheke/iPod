import React from 'react';
import './../css/blankscreen.css'

class BlankScreen extends React.Component{

    render(){
        const {data} = this.props;
        return <div className='blank-screen'>
            <img src={data.thumbnail} alt={data.title}></img>
            <h3>{data.title}</h3>
        </div>
    }
}
export default BlankScreen;