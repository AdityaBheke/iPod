import React from 'react';
import './../css/screen.css'

class ListItem extends React.Component {
  render() {
    const {item, selected} = this.props;
    // If item is selected add classname "selected"
    return <div className= {selected?'list-item selected':'list-item'}>
      {/* Name of element */}
      <span>{item.title}</span>
      <span className='open-arrow'><i className="bi bi-chevron-right"></i></span>
    </div>;
  }
}

export default ListItem;
