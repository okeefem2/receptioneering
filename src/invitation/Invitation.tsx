import React, { useContext, FormEvent } from 'react';
import { observer } from 'mobx-react';
import { invitationContext } from './invitation.store';
import { useFormState } from '../form/form-state';
import { FadeInSection } from '../fade-in-section/FadeInSection';

export const InvitationForm: React.FC = observer(() => {
    const { checkInvitation, errorMessage } = useContext(invitationContext);
    const [formValue, handleInputChange] = useFormState<{
        name?: string;
        email?: string;
    }>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        checkInvitation(formValue);
        e.preventDefault();
    };

    return (
        <div className="col">
            <h2>Enter A Name On Your Invitation</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="off"
                        className={formValue?.name ? 'has-value' : ''}
                        onChange={handleInputChange}
                    />
                    <span className="bar"></span>
                    <label className={'input-label'}>Name</label>
                </div>
                <span>Or</span>
                <div className="input-field">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        className={formValue?.email ? 'has-value' : ''}
                        onChange={handleInputChange}
                    />
                    <span className="bar"></span>
                    <label className={'input-label'}>Email</label>
                </div>
                {errorMessage && (
                    <FadeInSection fadeInDirection="back" full={true}>
                        <p className="error">{errorMessage}</p>
                    </FadeInSection>
                )}
                <button type="submit" className="button button--black-text">
                    Retrieve Invitation
                </button>
            </form>
        </div>
    );
});

export default InvitationForm;
