// src/components/Home.jsx
import React, { useState } from 'react';
import SportProfileForm from './SportProfileForm';
import InstructionDisplay from './InstructionDisplay';
import PostureCamera from './PostureCamera';

// NOTE: Add imports for other components (like Login/SignUp) if you decide to use them
// import Login from './Login';
// import SignUp from './SignUp';


const Home = () => {
    // --- Application State Management ---
    const [appState, setAppState] = useState('PROFILE_FORM'); // State controls which view is visible
    const [recommendation, setRecommendation] = useState(null); // Stores instructions and assets from backend

    // Function to handle the form submission (Level 1)
    const handleProfileSubmit = async (data) => {
        // Here, you would replace the mock response with a real API call (Team 3)
        console.log('Sending profile data to backend:', data);
        
        // Mock Backend Response 
        const mockResponse = {
            movement: data.sport.toUpperCase(),
            instructions: [
                { title: 'Back Position', detail: 'Keep your spine neutral, avoid rounding or excessive arching.' },
                { title: 'Knee Alignment', detail: 'Ensure knees track directly over your feet, do not let them collapse inward.' },
            ],
            illustrationUrl: '/assets/squat_illustration.gif', // Asset from Team 4
            products: [{ name: 'Resistance Band', url: '#band' }, { name: 'Yoga Mat', url: '#mat' }], // Data from Team 5
        };

        setRecommendation(mockResponse);
        setAppState('INSTRUCTIONS_DISPLAY');
    };

    // Function to determine which component to render
    const renderContent = () => {
        switch (appState) {
            case 'PROFILE_FORM':
                return <SportProfileForm onSubmit={handleProfileSubmit} />;
            
            case 'INSTRUCTIONS_DISPLAY':
                if (!recommendation) return null;
                return (
                    <InstructionDisplay 
                        recommendation={recommendation} 
                        onStartCamera={() => setAppState('CAMERA_CHECK')} 
                    />
                );
            
            case 'CAMERA_CHECK':
                return <PostureCamera movement={recommendation?.movement} />;
            
            // You can add other states here if you include login/signup later
            // case 'LOGIN':
            //     return <Login onLoginSuccess={() => setAppState('PROFILE_FORM')} />; 

            default:
                return <SportProfileForm onSubmit={handleProfileSubmit} />;
        }
    };

    return (
        <div className="home-container">
            {/* The main content switcher */}
            {renderContent()}
        </div>
    );
};

export default Home;