import React from 'react';
import supabase from '../utils/supabase';
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/AuthProvider';

const Settings = () => {
    const [obsServer, setObsServer] = useState('http://localhost:5001/video_feed');

    // Get the user from the AuthProvider
    const curUser = useAuth().curUser;
    console.log('Current User:', curUser);
    // Fetch the current OBS server from the database when the component mounts
    useEffect(() => {
        // Try to lookup the row using the user ID
        const fetchSettings = async () => {
            console.log("Fetching settings for user ID:", curUser.id);
            const { data, error } = await supabase
                .from('settings')
                .select()
                .eq('uid', curUser.id);
            // get uid from supabase auth
            if (error) {
                console.error('Error fetching settings:', error);
                // insert a new row if it doesn't exist
                const { data: insertData, error: insertError } = await supabase
                    .from('settings')
                    .insert({ uid: curUser.id, obs_server: obsServer });
                if (insertError) {
                    console.error('Error inserting default settings:', insertError);
                    return;
                }
                console.log('Default settings inserted:', insertData);
            } else {
                console.log('Settings data:', data);
                if (data.length > 0) {
                    setObsServer(data[0].obs_server);
                }
            }
        };
        fetchSettings();
    }, []);

    // Function to handle changes to the OBS server input
    const handleObsServerChange = async (obsServerValue) => {
    };

    const handleSettingsChange = (e) => {
        e.preventDefault();
        // Call the function to handle the OBS server change
        handleObsServerChange(obsServer);

        alert('Settings updated successfully!');
    }    
    
    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div className="setting-group">
                <label htmlFor="obsServer">OBS WebSocket Server:</label>
                <input
                    type="text"
                    id="obsServer"
                    value={obsServer}
                    placeholder="ws://localhost:4455"
                    className="input-field"
                    onChange={(e) => setObsServer(e.target.value)}
                    required
                />
                <p className="help-text">Enter your OBS WebSocket server address (e.g., ws://localhost:4455)</p>
            </div>
            <button onClick={handleSettingsChange}>Update Settings</button>
        </div>
    );
};

export default Settings;