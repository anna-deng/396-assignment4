// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

const Header = () => {
  return (
    <HeaderElem>
      <Title>How do our bodies digest sugar?</Title>
      <TitleIntro>by Anna Deng, Keren Park, and Meera Ramakrishnan</TitleIntro>
    </HeaderElem>
  );
};

const HeaderElem = styled.header`
  position: relative;
  height: 164px;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${BREAKPOINTS.lgMin} {
    margin-top: 250px;
  }
`;

const TitleIntro = styled.h3`
  font-weight: 200;
  color: ${COLORS.gray[700]};
  letter-spacing: 0px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  @media (orientation: portrait) {
    font-size: 8.5vw;
  }

  @media (orientation: landscape) {
    font-size: 3.5vw;
    /*
      On desktop, the alignment looks off, since the title starts with a W.
      By outdenting it a bit, it gives the illusion of alignment.
      (on mobile/portrait, though, there's an edge-of-screen there, so it looks
      funny with this outdent.)
    */
    margin-left: -9px;
  }

  @media ${BREAKPOINTS.lgMin} {
    /*
      At a certain point, the 'vw' solution looks a little obnoxiously large.
      There is a clever way to do this using 'calc', but the simple way is
      clearer.
    */
   margin-top: 26px;
    font-size: 36px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: ${COLORS.gray[900]};
  letter-spacing: -3px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  @media (orientation: portrait) {
    font-size: 16vw;
  }

  @media (orientation: landscape) {
    font-size: 7vw;
    /* See note in TitleIntro for explanation about this negative margin */
    margin-left: -9px;
  }

  @media ${BREAKPOINTS.lgMin} {
    /*
      At a certain point, the 'vw' solution looks a little obnoxiously large.
      There is a clever way to do this using 'calc', but the simple way is
      clearer.
    */
    margin-top: 90px;
    font-size: 72px;
  }
`;

export default Header;
