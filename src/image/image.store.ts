import { createContext } from 'react';
import { observable, action } from 'mobx';
import { firebaseStore } from '../firebase/firebase.store';

class ImageStore {
    @observable images: { [k: string]: string[] } = {
        rsvp: [],
        menu: [],
        schedule: [],
    };

    constructor() {
        this.initImages();
    }

    initImages = async (): Promise<void> => {
        for (const section in this.images) {
            const storageRef = firebaseStore.storage.ref().child(`${section}`);
            const res = await storageRef.listAll();
            res.items.forEach(async itemRef => {
                const url = await itemRef.getDownloadURL();
                this.addImage(section, url);
            });
        }
    };

    @action addImage = (section: string, url: string): void => {
        this.images[section].push(url);
    };
}

export const imageStore = new ImageStore();
export const imageContext = createContext(imageStore);
