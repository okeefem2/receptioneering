import { createContext } from 'react';
import { firebaseStore } from '../firebase/firebase.store';
import { observable, action, computed, reaction } from 'mobx';
import { doc, collectionData } from 'rxfire/firestore';
import { Invitation } from './invitation.model';
import { cleanString } from '../form/cleaning';
class InvitationStore {
    private readonly INVITATIONS_COLLECTION = 'invitations';

    @observable invitation!: Invitation;
    @observable responseMessage: string | undefined;
    @observable errorMessage: string | undefined;

    @computed get hasInvitation(): boolean {
        return !!this.invitation;
    }

    @computed get rsvp(): boolean {
        return !!this.invitation && this.invitation.rsvp === 'yes';
    }

    constructor() {
        reaction(
            () => this.invitation,
            invitation => {
                if (!invitation) {
                    window.localStorage.removeItem('invitation');
                } else {
                    window.localStorage.setItem(
                        'invitation',
                        JSON.stringify(invitation)
                    );

                    if (invitation.rsvp) {
                        const responseMessage = `We received your response and are
                        ${
                            invitation.rsvp === 'yes'
                                ? ' excited to see you! Check out the schedule and directions below.'
                                : ` sorry you can't make it, but hope we can see you sometime soon!`
                        }`;
                        this.setResponseMessage(responseMessage);
                    }
                }
            }
        );
        const savedInvitation = window.localStorage.getItem('invitation');
        if (savedInvitation) {
            const { id } = JSON.parse(savedInvitation);
            if (id) {
                this.fetchInvitation(id);
            }
        }
    }

    fetchInvitation = (id: string): void => {
        const invitationRef = firebaseStore.firestore
            .collection(this.INVITATIONS_COLLECTION)
            .doc(id);
        doc(invitationRef).subscribe(snapshot => {
            this.setInvitation({
                ...(snapshot.data() as Invitation),
                id: snapshot.id,
            });
        });
    };

    checkInvitation = ({
        name,
        email,
    }: {
        name?: string;
        email?: string;
    }): void => {
        this.setErrorMessage(undefined);
        name = cleanString(name);
        email = cleanString(email);
        const invitationsRef = firebaseStore.firestore.collection(
            this.INVITATIONS_COLLECTION
        );
        const invitationsQueryRef = invitationsRef.where(
            name ? 'names' : 'emails',
            'array-contains',
            name ? name : email
        );

        collectionData<Invitation>(invitationsQueryRef, 'id').subscribe(
            invitations => {
                if (invitations && invitations.length) {
                    const invitation = invitations[0];
                    this.setInvitation(invitation);
                } else {
                    this.setErrorMessage(
                        'No invitation found, please make sure you enter any name as shown on the invitation'
                    );
                }
            },
            e => {
                console.error(e);
                this.setErrorMessage(
                    'There was an issue fetching your invitation, please try again later'
                );
            }
        );
    };

    updateInvitation = (invitation: Partial<Invitation>): void => {
        if (this.invitation) {
            this.setErrorMessage(undefined);
            this.setResponseMessage(undefined);

            firebaseStore.firestore
                .collection(this.INVITATIONS_COLLECTION)
                .doc(this.invitation?.id)
                .update(invitation)
                .catch(() =>
                    this.setErrorMessage(
                        'There was an issue, please make sure information added is correct'
                    )
                );
        }
    };

    @action setInvitation = (invitation: Invitation): void => {
        this.invitation = invitation;
    };

    @action setErrorMessage = (message: string | undefined): void => {
        this.errorMessage = message;
    };

    @action setResponseMessage = (message: string | undefined): void => {
        this.responseMessage = message;
    };
}

export const invitationStore = new InvitationStore();
export const invitationContext = createContext(invitationStore);
