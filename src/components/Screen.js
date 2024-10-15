import React from 'react';
import './../css/screen.css';
import './../css/songscreen.css'
import List from './List';
import BlankScreen from './BlankScreen';

class Screen extends React.Component {
  render() {
    const {data, selected, isMenuOpen} = this.props;
    console.log(data);
    
    return <div className="screen">
      {data.type==='list' && isMenuOpen && <List list={data.subMenu} listHeading={data.title} selected={selected}/>}
      {data.type==='blank' && <BlankScreen data={data}/>}
    </div>;
  }
}

export default Screen;
