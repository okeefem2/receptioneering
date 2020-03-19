import React, { useContext, FormEvent } from 'react';
import { observer } from 'mobx-react';
import './Rsvp.scss';
import { invitationContext } from '../invitation/invitation.store';
import { useFormState } from '../form/form-state';
import { Invitation } from '../invitation/invitation.model';
import { FadeInSection } from '../fade-in-section/FadeInSection';

export const RsvpForm: React.FC = observer(() => {
    const {
        invitation,
        updateInvitation,
        errorMessage,
        responseMessage,
    } = useContext(invitationContext);
    const [formValue, handleInputChange] = useFormState<Invitation>({
        ...invitation,
        guests: invitation.guests || invitation.invites,
    });

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
                {formValue?.rsvp === 'yes' && (
                    <div className="centered">
                        <FadeInSection fadeInDirection="back" centered={true}>
                            <div className="input-field">
                                <input
                                    id="guests"
                                    type="number"
                                    min="1"
                                    max={invitation?.invites}
                                    name="guests"
                                    autoComplete="off"
                                    className={
                                        formValue?.guests
                                            ? 'has-value full'
                                            : 'full'
                                    }
                                    value={formValue?.guests}
                                    onChange={handleInputChange}
                                />
                                <span className="bar"></span>
                                <label className={'input-label'}>
                                    # Guests Attending
                                </label>
                            </div>
                        </FadeInSection>
                    </div>
                )}
                <div className="input-field">
                    <input
                        id="notes"
                        type="text"
                        name="notes"
                        autoComplete="off"
                        className={
                            invitation?.notes ? 'has-value full' : 'full'
                        }
                        value={formValue?.notes}
                        onChange={handleInputChange}
                    />
                    <span className="bar"></span>
                    <label className={'input-label'}>Notes</label>
                </div>
                {!errorMessage && responseMessage && (
                    <FadeInSection fadeInDirection="back" full={true}>
                        <p className={'response-message'}>{responseMessage}</p>
                    </FadeInSection>
                )}
                {errorMessage && (
                    <FadeInSection fadeInDirection="back" full={true}>
                        <p className="error">{errorMessage}</p>
                    </FadeInSection>
                )}
                <button type="submit" className="button button--black-text">
                    {!invitation?.rsvp ? 'Send' : 'Update'} Response
                </button>
            </form>
        </div>
    );
});

export default RsvpForm;
