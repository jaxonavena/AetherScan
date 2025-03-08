import React from 'react';

const LiveVideoFeed = () => {
    return (
        <div>
            <h2>Live Video Feed</h2>
            <p>Will display what the drone is seeing</p>
            <iframe width="1000" height="630" src="https://www.youtube.com/embed/IMdeVBKfhFk?si=sJqonRsivKd2-fZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    );
};

export default LiveVideoFeed;