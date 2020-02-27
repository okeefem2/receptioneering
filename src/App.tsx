import React from 'react';
import './App.scss';
import { Rsvp } from './rsvp/Rsvp';
import { FadeInSection } from './fade-in-section/FadeInSection';

function App() {
  return (
    <>
      <FadeInSection>
        <Rsvp />
      </FadeInSection>
    </>
  );
}

export default App;
