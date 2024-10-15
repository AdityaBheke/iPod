import React from 'react';
import './../css/buttoncontainer.css'

class ButtonContainer extends React.Component {

  render() {
    const {toggleMenu, handleSelect, handlePointerDown, handlePointerMove, handlePointerUp, handlePlayPause, handleNext, handlePrevious} = this.props;
    return <div className="button-container" onPointerDown={(event)=>{handlePointerDown(event)}} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onPointerMove={(event)=>{handlePointerMove(event)}}>
        <button title='Menu' id='menu' onClick={toggleMenu} >Menu</button>
        <button title='Next Song' id='forward' onClick={handleNext}><i className="bi bi-skip-forward-fill"></i></button>
        <button title='Play/Pause Song' id='play-pause' onClick={handlePlayPause}><i className="bi bi-play-fill"></i><i className="bi bi-pause-fill"></i></button>
        <button title='Previous Song' id='backward' onClick={handlePrevious}><i className="bi bi-skip-backward-fill"></i></button>
        <button title='Select' id='select' onClick={handleSelect}>Select</button>
    </div>;
  }
}

export default ButtonContainer;
