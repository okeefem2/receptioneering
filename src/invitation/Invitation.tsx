import React, { useContext, FormEvent } from 'react';
import { observer } from 'mobx-react';
import './Invitation.scss';
import { invitationContext } from './invitation.store';
import { useFormState } from '../form/form-state';

export const InvitationForm: React.FC = observer(() => {
    const { checkInvitation, errorMessage } = useContext(invitationContext);
    const [formValue, handleInputChange] = useFormState<{
        name?: string;
        email?: string;
    }>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        checkInvitation(formValue);
    };

    return (
        <div className="col">
            <h2>Enter Name On Invitation</h2>
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
                    <div>
                        <p className="error">{errorMessage}</p>
                    </div>
                )}
                <button type="submit" className="button button--black-text">
                    Retrieve Invitation
                </button>
            </form>
        </div>
    );
});

export default InvitationForm;
