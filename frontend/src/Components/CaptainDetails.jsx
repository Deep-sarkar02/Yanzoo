import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    console.log(captain);

    const [stats, setStats] = React.useState({
        earnings: 0,
        distance: 0,
        duration: 0,
        count: 0
    });

    React.useEffect(() => {
        const fetchStats = async () => {
            // If captain is loading or undefined, don't fetch yet
            if (!captain) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/rides/captain-stats`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('captain-token')}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Error fetching captain stats:", error);
            }
        };

        fetchStats();
    }, [captain]);

    if (!captain) {
        return <div>Loading captain data...</div>;
    }

    return (
        <div>
            {/* captain data and the earning details */}
            <div className="flex justify-between items-center">
                {/* this is for the captain details */}
                <div className="flex items-center justify-start gap-3">
                    {/* captain imgae */}
                    <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUtppxAYvLQxuaGpNpfglY-s1oubTXk0EmQ&s" alt="" />
                    {/* name of captain */}
                    <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                {/* stats of the earning */}
                <div>
                    <h4 className="text-xl font-semibold">₹{stats.earnings.toFixed(2)}</h4>
                    <p className="text-sm text-gray-600">Earned</p>
                </div>
            </div>
            {/* captain hours , km driven , and the rating */}
            <div className="flex p-3 mt-6 rounded-xl bg-gray-50 justify-center items-start gap-12">
                {/* total distance */}
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className="text-lg font-medium">{(stats.duration / 3600).toFixed(2)}</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                {/* km driven */}
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                    <h5 className="text-lg font-medium">{(stats.distance / 1000).toFixed(2)}</h5>
                    <p className="text-sm text-gray-600">km Driven</p>
                </div>
                {/* rating */}
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className="text-lg font-medium">4.5</h5>
                    <p className="text-sm text-gray-600">Rating</p>
                </div>
            </div>
        </div>
    )
}
export default CaptainDetails;
