import React from 'react';
import styled from 'styled-components';
import { ChartPage } from './components/entries/ChartPage';

import './ui/global.css'

function App() {
  return (
    <Wrapper>
      <ChartPage />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 0 20px;
`