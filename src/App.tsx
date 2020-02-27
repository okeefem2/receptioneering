import React from 'react';
import './App.scss';
import { Rsvp } from './rsvp/Rsvp';
import { FadeInSection } from './fade-in-section/FadeInSection';
import { Menu } from './menu/Menu';

function App() {
  return (
    <>
      <section id="rsvp">
        <FadeInSection>
          <Rsvp />
        </FadeInSection>
      </section>
      <section id="menu">
        <FadeInSection>
          <Menu />
        </FadeInSection>
      </section>
    </>
  );
}

export default App;
