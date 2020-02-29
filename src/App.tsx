import React from 'react';
import './App.scss';
import { Rsvp } from './rsvp/Rsvp';
import { FadeInSection } from './fade-in-section/FadeInSection';
import { Menu } from './menu/Menu';
import { Location } from './location/Location';
import rsvp from './rsvp.jpg'
import menu from './menu.jpg'
import menu2 from './menu2.jpg'
import menu3 from './menu3.jpg'
import menu4 from './menu4.jpg'
import menu5 from './menu5.jpg'

import schedule1 from './schedule1.jpg'
import schedule2 from './schedule2.jpg'

import Schedule from './schedule/Schedule';
function App() {
  return (
    <>
      <section id="rsvp">
        <FadeInSection>
          <Rsvp />
        </FadeInSection>
        <FadeInSection fadeInDirection="right">
          <div className="col">
            <img src={rsvp} alt="rsvp"></img>
          </div>
        </FadeInSection>
      </section>
      <section id="menu">
        <FadeInSection fadeInDirection="left">
          <div className="col col--spaced">
            <img className='menu-img' src={menu} alt="menu"></img>
            <img className='menu-img' src={menu2} alt="menu2"></img>
            <img className='menu-img' src={menu3} alt="menu3"></img>
            <img className='menu-img' src={menu4} alt="menu4"></img>
            <img className='menu-img' src={menu5} alt="menu5"></img>
          </div>
        </FadeInSection>
        <FadeInSection>
          <Menu />
        </FadeInSection>
      </section>
      <section id="schedule">
        <FadeInSection >
          <Schedule />
        </FadeInSection>
        <FadeInSection fadeInDirection="right">
          <div className="col col--spaced">
            <img className='menu-img' src={schedule1} alt="schedule1"></img>
            <img className='menu-img' src={schedule2} alt="schedule2"></img>
          </div>
        </FadeInSection>
      </section>
      <section id="location">
        <FadeInSection full={true}>
          <Location />
          <p className="contact">
            We are excited to see you there! If you have any questions or concerns please reach out to us at okeefem355@gmail or give one of us a call.
        </p>
        </FadeInSection>
      </section>

    </>
  );
}

export default App;
