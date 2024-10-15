import React from 'react';
import './../css/screen.css'
import ListItem from './ListItem';

class List extends React.Component {
  render() {
    const {list, selected, listHeading} = this.props;
    return <div className="menu-container">
      {/* Heading of Menu */}
        <div className='menu-header'>{listHeading}</div>
        {/* Render ListItem Component representing individual element of List*/}
      {list.map((item, index)=><ListItem key={index} item={item} selected={selected===index?true:false}/>)}
    </div>;
  }
}

export default List;
