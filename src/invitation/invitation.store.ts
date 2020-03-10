import { createContext } from 'react';
import { firebaseStore } from '../firebase/firebase.store';
import { observable, action, computed, reaction } from 'mobx';
import { collectionData, docData } from 'rxfire/firestore';
import { take } from 'rxjs/operators';

interface Invitation {
    id: string;
    names: string[];
    emails: string[];
    notes: string;
    rsvp: boolean;
}
class InvitationStore {
    private readonly INVITATIONS_COLLECTION = 'invitations';

    @observable invitation: Invitation | undefined;
    @observable errorMessage: string | undefined;

    @computed get hasInvitation(): boolean {
        return !!this.invitation;
    }

    @computed get rsvp(): boolean {
        return !!this.invitation && this.invitation.rsvp;
    }

    constructor() {
        reaction(
            () => this.invitation,
            invitation => {
                if (!invitation) {
                    console.log('removing localstorage');
                    window.localStorage.removeItem('invitation');
                } else {
                    console.log('setting localstorage', invitation);
                    window.localStorage.setItem(
                        'invitation',
                        JSON.stringify(invitation)
                    );
                }
            }
        );
        const savedInvitation = window.localStorage.getItem('invitation');
        console.log('from localstorage', savedInvitation);
        if (savedInvitation) {
            debugger;
            const { id } = JSON.parse(savedInvitation);
            if (id) {
                // fetch from firestore
                this.fetchInvitation(id);
            }
        }
    }

    fetchInvitation = (id: string): void => {
        console.log('fetching', id);
        const invitationRef = firebaseStore.firestore
            .collection(this.INVITATIONS_COLLECTION)
            .doc(id);
        docData<Invitation>(invitationRef)
            .pipe(take(1))
            .subscribe(invitation => {
                this.setInvitation(invitation);
            });
    };

    checkInvitation = ({
        name,
        email,
    }: {
        name?: string;
        email?: string;
    }): void => {
        const invitationsRef = firebaseStore.firestore.collection(
            this.INVITATIONS_COLLECTION
        );
        const invitationsQueryRef = invitationsRef.where(
            name ? 'names' : 'emails',
            'array-contains',
            name ? name : email
        );

        // TODO sub teardown
        collectionData<Invitation>(invitationsQueryRef, 'id').subscribe(
            invitations => {
                console.log(invitations);
                if (invitations && invitations.length) {
                    this.setInvitation(invitations[0]);
                } else {
                    this.setErrorMessage('No invitation found');
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
            firebaseStore.firestore
                .collection(this.INVITATIONS_COLLECTION)
                .doc(this.invitation?.id)
                .update(invitation);
        }
    };

    @action setInvitation = (invitation: Invitation): void => {
        this.invitation = invitation;
    };

    @action setErrorMessage = (message: string): void => {
        this.errorMessage = message;
    };
}

export const invitationStore = new InvitationStore();
export const invitationContext = createContext(invitationStore);
