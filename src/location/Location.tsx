import React from 'react';
import { observer } from 'mobx-react';
import './Location.scss';
import { GOOGLE_MAPS_API_KEY } from '../config/config';

export const Location: React.FC = observer(() => {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=2474 Sunset Bluff Dr, Holland, MI 49424`;
    return (
        <>
            <div className="col">
                <h2>Location</h2>
                <p>
                    This is an <strong>OUTDOOR</strong> reception at the
                    beautiful home of Dan and Mary O&#39;Keefe in Holland
                    Michigan overlooking Lake Michigan. We will have a large
                    tent on site that will accommodate all of us in the event of
                    weather. Please dress comfortably in business casual attire.
                </p>
                <p>2474 Sunset Bluff Dr, Holland, MI 49424</p>
                <p>
                    Parking will be on the hill leading up to the house on
                    Sunset Bluff Dr, the earlier you are the closer you will be!
                    If you are less mobile you can drive directly into the
                    driveway and we can valet your car for you.
                </p>
                <p>
                    If you are wanting to stay the night in town, there are
                    hotels in the area. Please feel free to reach out to us if
                    you need help setting something up.
                </p>
                <iframe
                    title="location"
                    width="700"
                    height="500"
                    src={mapUrl}
                ></iframe>
            </div>
        </>
    );
});

export default Location;
