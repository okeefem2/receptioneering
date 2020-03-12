import { createContext } from 'react';
import { firebaseStore } from '../firebase/firebase.store';
import { observable, action, computed, reaction } from 'mobx';
import { collectionChanges, doc } from 'rxfire/firestore';
import { Invitation } from './invitation.model';
class InvitationStore {
    private readonly INVITATIONS_COLLECTION = 'invitations';

    @observable invitation!: Invitation;
    @observable errorMessage!: string;

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
        const invitationsRef = firebaseStore.firestore.collection(
            this.INVITATIONS_COLLECTION
        );
        const invitationsQueryRef = invitationsRef.where(
            name ? 'names' : 'emails',
            'array-contains',
            name ? name : email
        );

        // TODO sub teardown
        collectionChanges(invitationsQueryRef).subscribe(
            invitations => {
                if (invitations && invitations.length) {
                    const invitation = invitations[0].doc;
                    this.setInvitation({
                        ...(invitation.data() as Invitation),
                        id: invitation.id,
                    });
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
