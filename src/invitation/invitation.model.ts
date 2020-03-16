export interface Invitation {
    id: string;
    names: string[];
    emails: string[];
    notes: string;
    rsvp: 'yes' | 'no';
    guests: number;
    invites: number;
}
