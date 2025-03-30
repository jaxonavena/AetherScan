import React from 'react';

const LiveVideoFeed = () => {
    return (
        <div>
            <h2>Live Video Feed</h2>
            <p>Will display what the drone is seeing</p>
            <img 
                src="http://localhost:5001/video_feed" 
                alt="Live Drone Feed"
                width="1000"
                height="630"
            />
        </div>
    );
};

export default LiveVideoFeed;
