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
            <h2>Rsvp</h2>
            <p>
                Check out the menu below and let us know if you have any
                allergies or requests
            </p>
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
                    <label htmlFor="no">We are not going to make it</label>
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

            {invitation?.rsvp && (
                <p className={'response-message'}>
                    We received your response and are
                    {invitation?.rsvp === 'yes'
                        ? ' excited to see you! Check out the schedule and directions below.'
                        : ` sorry you can't make it, but hope we can see you sometime soon!`}
                </p>
            )}
        </div>
    );
});

export default RsvpForm;
