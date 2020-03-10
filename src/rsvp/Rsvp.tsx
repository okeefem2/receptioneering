import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import './Rsvp.scss';
import { invitationContext } from '../invitation/invitation.store';

export const Rsvp: React.FC = observer(() => {
    const { invitation } = useContext(invitationContext);

    return (
        <div className="col">
            <h2>Rsvp Details</h2>
            <form>
                <div>
                    <input
                        id="yes"
                        type="radio"
                        name="yes"
                        value="true"
                        checked={
                            invitation?.rsvp || invitation?.rsvp === undefined
                        }
                    />
                    <label htmlFor="yes">We will be there!</label>
                </div>
                <div>
                    <input
                        id="no"
                        type="radio"
                        name="no"
                        value="false"
                        checked={invitation?.rsvp === false}
                    />
                    <label htmlFor="no">Sorry, not going to make it</label>
                </div>
                <div className="input-field">
                    <input
                        id="notes"
                        type="text"
                        name="email"
                        autoComplete="off"
                        value={invitation?.notes}
                    />
                    <span className="bar"></span>
                    <label>Notes</label>
                </div>
            </form>
        </div>
    );
});

export default Rsvp;
