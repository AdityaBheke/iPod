import React from 'react';
import './../css/screen.css'

class ListItem extends React.Component {
  render() {
    const {item, selected} = this.props;
    return <div className= {selected?'list-item selected':'list-item'}>
      <span>{item.name}</span>
      <span className='open-arrow'><i className="bi bi-chevron-right"></i></span>
    </div>;
  }
}

export default ListItem;
