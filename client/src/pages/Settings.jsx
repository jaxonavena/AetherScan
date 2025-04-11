import React from 'react';
import supabase from '../utils/supabase';
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/AuthProvider';

const Settings = () => {
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
                // insert a new row if it doesn't exist
                const { data: insertData, error: insertError } = await supabase
                    .from('settings')
                    .insert({ uid: curUser.id, obs_server: 'ws://localhost:4455' });
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
        // send value to supabase DB
        console.log('User ID:', curUser.id);
        console.log('New OBS server value:', obsServerValue);

        // Check if the obsServerValue is empty
        if (!obsServerValue) {
            return "Please enter a valid OBS server address.";
        }

        // Update the OBS server in the database
        const { data, error } = await supabase
            .from('settings')
            .update({ obs_server: obsServerValue })
            .eq('uid', curUser.id);
        if (error) {
            console.error('Error updating OBS server:', error);
            return "Failed to update OBS server: " + error.message;
        }
        if (data) {
            console.log('OBS server updated:', data);
        }
        return null;
    };

    const handleSettingsChange = async (e) => {
        e.preventDefault();
        // Call the function to handle the OBS server change
        let err = null;
        err = await handleObsServerChange(obsServer);

        // Check if there was an error
        if (err) {
            alert(err);
        } else {
            alert('Settings updated successfully!');
        }
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
                    style={{ width: '15%' }}
                    required
                />
                <p className="help-text">Enter your OBS WebSocket server address (e.g., ws://localhost:4455)</p>
            </div>
            <button onClick={handleSettingsChange}>Update Settings</button>
        </div>
    );
};

export default Settings;