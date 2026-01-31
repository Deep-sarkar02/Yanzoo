import React from 'react';
function LocationSearchPanel(props) {
    // the setvehicle panel and the vehicle panel is passed from the home component
    console.log(props)
    // if we have array for the loccation 
    //  then we will place a loop for the locations
    const locations = [
        {
            id: 1,
            name: "24B , Near kapoor's Cafe ,Kempagowda"
        },
        {
            id: 2,
            name: "2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal"
        },
        {
            id: 3,
            name: "2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal"
        },
        {
            id: 4,
            name: "2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal"
        },
    ]
    return (
        <div>
            {/* now we will loop over  the arrray */}
            {locations.map(function (location, index) {
                return (
                    // if the vehicle panel is true then the vehicle panel will be visible
                    <div onClick={() => {
                        props.setVehiclePanelOpen(true)
                        props.setPanel(false)
                    }} key={index} className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex items-center justify-center'>
                            <i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{location.name}</h4>
                    </div>
                )
            })}

            {/* this is just a sample data */}
            {/* <div className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex items-center justify-center'>
                    <i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'>24B , Near kapoor's Cafe ,Kempagowda</h4>
            </div>
            <div className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex items-center justify-center'>
                    <i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'>2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal</h4>
            </div>
            <div className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex items-center justify-center'>
                    <i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'>2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal</h4>
            </div>
            <div className='flex gap-4 border-2 p-2 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full flex items-center justify-center'>
                    <i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'>2/4B , Near kapoor's Cafe,Rani Kamalapati,Bhopal</h4>
            </div> */}
        </div>
    );
}
export default LocationSearchPanel;