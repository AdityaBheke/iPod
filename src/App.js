import React from 'react';
import './css/app.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Screen from './components/Screen';
import ButtonContainer from './components/ButtonContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      selectedIndex: 0,
      currentSubMenu: [],
      isDragging: false,
      startX: 0,
      startY: 0,
      screenData: null,
      currentTime: 0,
      totalDuration: 0,
      progressBarWidth: 0,
      playList:[]
    };
    this.audio = null
  }
  // FUNCTIONS RELATED TO DATA FETCHING
  componentDidMount() {
    // Updating initial Menu List
    this.fetchData("./json/menu.json").then((data) => {
      this.setState({
        screenData: data,
        currentSubMenu: data.content,
      });
    });
  }
  // Function to fetch Submenu
  fetchData = async (url) => {
    
    const fetchedData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    return fetchedData;
  };
  componentDidUpdate() {
    // Add eventListener to Audio Element
    if (this.audio) {
      this.audio.addEventListener('timeupdate', this.updateCurrentTime);
      this.audio.addEventListener('loadedmetadata', this.updateTotalDuration);
    }
  }

  // FUNCTIONS RELATED TO BUTTONS ON WHEEL
  // Function to handle Menu button
  toggleMenu = () => {
    // Fetch default menu list and toggle "isOpenMenu"
    this.fetchData("./json/menu.json").then((data) => {
      this.setState({
        screenData: data,
        currentSubMenu: data.content,
        isMenuOpen: !this.state.isMenuOpen,
        selectedIndex: 0
      });
    });
    
    // Reset already playing audio and set it to null (if any)
    if (this.audio) {
      this.audio.load();
      this.audio = null; 
    }
  };
  // Function to handle Select Button
  handleSelect = () => {
    // Check if menu is open or not
    if (!this.state.isMenuOpen) {
      return;
    }

    if (this.state.currentSubMenu[this.state.selectedIndex].type==='list') {
      // if type of selected object is list then fetch and update subMenu
      this.fetchData(this.state.currentSubMenu[this.state.selectedIndex].subMenu).then((data) => {
        this.setState({
          screenData: data,
          currentSubMenu: data.content,
          playList: (data.content.filter(songData=> songData.type==='song')).map(song=>new Audio(song.content)) //if objects inside list are of type song then add to playlist
        });
      });

    } else{
      // update screen data 
      this.setState({
        screenData: this.state.currentSubMenu[this.state.selectedIndex],
        isMenuOpen: false
      });
      // if type of selected object is song then update audio element
      this.audio = this.state.currentSubMenu[this.state.selectedIndex].type==='song'?this.state.playList[this.state.selectedIndex]:null
      if (this.audio) {
        this.audio.play();
      }
    }
    
  };

  // FUNCTIONS RELATED TO WHEEL
    // Function to handle Pointer down event on wheel 
    handlePointerDown = (event) => {
      // set isDragging to true so that pointerMove function can be operated after clicking and holding the wheel
      // Also setting initial X and Y position of cursor to track its relative movement
      this.setState({
        isDragging: true,
        startX: event.clientX,
        startY: event.clientY,
      });
    };
    // Function to handle Pointer up event on wheel 
    handlePointerUp = () => {
      // Setting isDragging to false so that pointerMove function should not operated after releasing the wheel
      this.setState({
        isDragging: false,
      });
    };
    handlePointerMove = (event) => {
      // Implement this function only if Menu is open and user is clicking and holding wheel
      if (!this.state.isDragging || !this.state.isMenuOpen) {
        return;
      }
      // Calculate relative X and Y movement of cursor
      const deltaX = event.clientX - this.state.startX;
      const deltaY = event.clientY - this.state.startY;
      let newIndex = this.state.selectedIndex;
      // If relative movement is greater than 20px then only update newIndex
      if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
        if (
          (deltaX > 0 &&
            this.state.selectedIndex < this.state.currentSubMenu.length - 1) ||
          (deltaY > 0 &&
            this.state.selectedIndex < this.state.currentSubMenu.length - 1)
        ) {
          // If relative movement is positive then increment newIndex
          newIndex++;
        } else if (
          (deltaX < 0 && this.state.selectedIndex > 0) ||
          (deltaY < 0 && this.state.selectedIndex > 0)
        ) {
          // If relative movement is negative then decrement newIndex
          newIndex--;
        } else if (
          (deltaX > 0 &&
            this.state.selectedIndex === this.state.currentSubMenu.length - 1) ||
          (deltaY > 0 &&
            this.state.selectedIndex === this.state.currentSubMenu.length - 1)
        ) {
          // If relative movement is positive and selectedIndex is equal to last index of menu then set it to 0
          newIndex = 0;
        } else if (
          (deltaX < 0 && this.state.selectedIndex === 0) ||
          (deltaY < 0 && this.state.selectedIndex === 0)
        ) {
          // If relative movement is negative and selectedIndex is equal to 0 of menu then set it to last index of menu
          newIndex = this.state.currentSubMenu.length - 1;
        }
        // Update initial X and Y and selectedIndex
        this.setState({
          selectedIndex: newIndex,
          startX: event.clientX,
          startY: event.clientY,
        });
      }
    };
  render() {
    return (
      <div className="App" id="ipod">
        <Screen
          data={this.state[this.state.currentScreen]}
          selected={this.state.selectedIndex}
          isMenuOpen={this.state.isMenuOpen}
        />

        <ButtonContainer
          toggleMenu={this.toggleMenu}
          handleSelect={this.handleSelect}
          handlePointerDown={this.handlePointerDown}
          handlePointerUp={this.handlePointerUp}
          handlePointerMove={this.handlePointerMove}
        />
      </div>
    );
  }
}

export default App;
