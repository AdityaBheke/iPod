import React from 'react';
import './../css/screen.css';
import './../css/songscreen.css'
import List from './List';
import BlankScreen from './BlankScreen';
import SongScreen from './SongScreen';

class Screen extends React.Component {
  
  render() {
    const {screenData, isMenuOpen, selectedIndex, currentTime, totalDuration, progressBarWidth} = this.props;
    // console.log(screenData);
    
    return <div className="screen">
      {/* If type of screenData is list and Menu is Open then render List Component */}
      {screenData?.type==='list' && isMenuOpen && <List list={screenData?.content} listHeading={screenData?.title} selected={selectedIndex}/>}
      {/* If type of screenData is Just Page then render BlankScreen Component with relevent data */}
      {screenData?.type==='page' && <BlankScreen data={screenData}/>}
      {/* If type of screenData is song then render SongScreen Component with relevent data */}
      {screenData?.type==='song' && <SongScreen data={screenData} currentTime = {currentTime} totalDuration = {totalDuration} progressBarWidth={progressBarWidth}/>}
    </div>;
  }
}

export default Screen;
