import React from 'react'
import { observer } from 'mobx-react';
import './Rsvp.scss';

export const Rsvp: React.FC = observer(() => {
    return (
        <div className="col">
            <h2>Enter Name On Invitation To RSVP</h2>
            <form>
                <div className="input-field">
                    <input id="name" type="text" name="name" autoComplete="off" />
                    <span className="bar"></span>
                    <label>Name</label>
                </div>
                <span>Or</span>
                <div className="input-field">
                    <input id="email" type="email" name="email" autoComplete="off" />
                    <span className="bar"></span>
                    <label>Email</label>
                </div>
            </form>
        </div>
    );
});

export default Rsvp;
