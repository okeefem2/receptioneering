import React, { useContext, FormEvent } from 'react';
import { observer } from 'mobx-react';
import './Rsvp.scss';
import { invitationContext } from '../invitation/invitation.store';
import { useFormState } from '../form/form-state';
import { Invitation } from '../invitation/invitation.model';

export const RsvpForm: React.FC = observer(() => {
    const { invitation, updateInvitation } = useContext(invitationContext);
    // eslint-disable-next-line
    const [formValue, handleInputChange] = useFormState<Invitation>(invitation);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        updateInvitation(formValue);
    };

    return (
        <div className="col">
            <h2>Rsvp Details</h2>
            <form onSubmit={handleSubmit}>
                <div className={'radio'}>
                    <input
                        id="yes"
                        type="radio"
                        name="rsvp"
                        value="yes"
                        checked={formValue?.rsvp === 'yes'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="yes">We will be there!</label>
                </div>
                <div className={'radio'}>
                    <input
                        id="no"
                        type="radio"
                        name="rsvp"
                        value="no"
                        checked={formValue?.rsvp === 'no'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="no">Sorry, not going to make it</label>
                </div>
                <div className="input-field">
                    <input
                        id="notes"
                        type="text"
                        name="notes"
                        autoComplete="off"
                        className={invitation?.notes ? 'has-value' : ''}
                        value={formValue?.notes}
                        onChange={handleInputChange}
                    />
                    <span className="bar"></span>
                    <label className={'input-label'}>Notes</label>
                </div>
                <button type="submit" className="button button--black-text">
                    {!invitation?.rsvp ? 'Send' : 'Update'} Response
                </button>
            </form>
        </div>
    );
});

export default RsvpForm;
