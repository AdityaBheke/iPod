import React from 'react';

class SongScreen extends React.Component{
    render(){
        const {data, currentTime, totalDuration, progressBarWidth} = this.props;
        return <div className='song-screen'>
            {/* Song card */}
            <div className='song-card'>
                {/* Song thumbnail */}
                <img src={data.icon} alt='thumbnail'></img>
                <div>
                    {/* Song name and Artist name */}
                    <h3>{data.title}</h3>
                    <span>{data.artist}</span>
                </div>
            </div>
            {/* Progress bar */}
            <div className='song-progress'>
                {/* current time */}
                <span>{currentTime}</span>
                {/* progress bar with dynamic width */}
                <div id='progress-bar' style={{"--width": progressBarWidth+"%"}}></div>
                {/* Total duration of song */}
                <span>{totalDuration}</span>
            </div>
        </div>
    }
}
export default SongScreen;