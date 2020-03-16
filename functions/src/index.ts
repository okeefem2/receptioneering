import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

exports.rsvp = functions.firestore
    .document('invitations/{invitationId}')
    .onUpdate(change => {
        const after = change.after.data();
        const before = change.before.data();
        if (!before || !after) return;
        const beforeRsvp = before.rsvp;
        const afterRsvp = after.rsvp;
        if (afterRsvp !== beforeRsvp && !!afterRsvp) {
            const invitees = after.names.join(' and ');
            sgMail.setApiKey(functions.config().sendgrid.key);
            const msg = {
                to: 'okeefem355@gmail.com',
                from: 'receptioneering-functions@receptioneering.com',
                subject: 'Receptioneering Rsvp Updated',
                text: `${invitees} have updated their rsvp status for ${
                    after.guests
                } guests to ${afterRsvp}${
                    after.note ? `with note ${after.note}` : ''
                }`,
            };
            return sgMail.send(msg);
        }
        return;
    });
