import React, { useContext } from 'react';
import './App.scss';
import InvitationForm from './invitation/Invitation';
import { FadeInSection } from './fade-in-section/FadeInSection';
import { Menu } from './menu/Menu';
import { Location } from './location/Location';

import Schedule from './schedule/Schedule';
import { observer } from 'mobx-react';
import { invitationContext } from './invitation/invitation.store';
import RsvpForm from './rsvp/Rsvp';
import { imageContext } from './image/image.store';
import MtnLogo from './mtn-logo.png';

export const App: React.FC = observer(() => {
    const { hasInvitation, rsvp } = useContext(invitationContext);
    const { images } = useContext(imageContext);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const buildImage = (section: string, className?: string) => (
        url: string
    ) => <img src={url} alt={section} className={className} key={url}></img>;
    return (
        <>
            <section id="rsvp">
                <FadeInSection>
                    {hasInvitation ? <RsvpForm /> : <InvitationForm />}
                </FadeInSection>
                <FadeInSection fadeInDirection="right">
                    <div className="col">
                        {images.rsvp.map(buildImage('rsvp', 'img'))}
                    </div>
                </FadeInSection>
            </section>
            {hasInvitation && (
                <section id="menu">
                    <FadeInSection fadeInDirection="left">
                        <div className="col col--spaced">
                            {images.menu.map(
                                buildImage('menu', 'img menu-img')
                            )}
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <Menu />
                    </FadeInSection>
                </section>
            )}
            {rsvp && (
                <>
                    <section id="schedule">
                        <FadeInSection>
                            <Schedule />
                        </FadeInSection>
                        <FadeInSection fadeInDirection="right">
                            <div className="col col--spaced">
                                {images.schedule.map(
                                    buildImage('schedule', 'img menu-img')
                                )}
                            </div>
                        </FadeInSection>
                    </section>
                    <section id="location">
                        <FadeInSection full={true}>
                            <Location />
                            <p className="contact">
                                We are excited to see you there! If you have any
                                questions or concerns please reach out to us at
                                okeefem355@gmail.com or give one of us a call.
                            </p>
                        </FadeInSection>
                    </section>
                    <div className="logo-row">
                        <FadeInSection full={true} fadeInDirection="back">
                            <img
                                src={MtnLogo}
                                alt={'Logo'}
                                width={'100px'}
                            ></img>
                        </FadeInSection>
                    </div>
                </>
            )}
        </>
    );
});

export default App;
