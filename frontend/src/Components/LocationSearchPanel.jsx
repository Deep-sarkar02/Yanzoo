import React from 'react';

function LocationSearchPanel({ suggestions, setPickup, setDestination, activeField, setVehiclePanelOpen, setPanel }) {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description);
        } else if (activeField === 'destination') {
            setDestination(suggestion.description);
        }
        setPanel(true);
        // If both are set, we might want to open the vehicle panel, 
        // but for now, let's just close the search panel
        // setVehiclePanelOpen(true);
    };

    return (
        <div>
            {/* Render suggestions from the backend dynamically */}
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium text-sm'>{suggestion.description}</h4>
                </div>
            ))}
        </div>
    );
}

export default LocationSearchPanel;