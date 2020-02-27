import { createContext } from 'react';

class RsvpStore {

}

export const rsvpStore = new RsvpStore();
export const rsvpContext = createContext(rsvpStore);
