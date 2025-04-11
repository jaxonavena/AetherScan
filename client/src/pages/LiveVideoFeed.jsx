import React from 'react';
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/AuthProvider';
import supabase from '../utils/supabase';

// This component will display the live video feed from the drone.
const LiveVideoFeed = () => {
    // State to hold the OBS server address
    const [obsServer, setObsServer] = useState('');

    // Get the user from the AuthProvider
    const curUser = useAuth().curUser;
    // Fetch the current OBS server from the database when the component mounts
    useEffect(() => {
        // Try to lookup the row using the user ID
        console.log('Current User:', curUser);
        const fetchSettings = async () => {
            console.log("Fetching settings for user ID:", curUser.id);
            const { data, error } = await supabase
                .from('settings')
                .select()
                .eq('uid', curUser.id);
            // get uid from supabase auth
            if (error) {
                console.error('Error fetching settings:', error);
                setObsServer('http://localhost:5001/video_feed');
            } else {
                console.log('Settings data:', data);
                if (data.length > 0) {
                    setObsServer(data[0].obs_server);
                }
            }
        };
        fetchSettings();
    }, []);


    return (
        <div>
            <h2>Live Video Feed</h2>
            <p>Will display what the drone is seeing</p>
            <img 
                src={obsServer === '' ? 'http://localhost:5001/video_feed' : obsServer} 
                alt="Live Drone Feed"
                width="1000"
                height="630"
            />
        </div>
    );
};

export default LiveVideoFeed;
