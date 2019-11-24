// @flow
import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

import { COLORS } from '../../constants';

import HitCounter from '../HitCounter';

const Footer = () => {
  return (
    <Wrapper>
      <Copyright>
        <strong>© Josh Comeau, 2018 and beyond.</strong>
      </Copyright>
      <License>
      <Link external to="https://github.com/joshwcomeau/waveforms">
            View the source
      </Link>.
      </License>

      <CounterWrapper>
        <HitCounter />
      </CounterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  text-align: center;
  background-color: ${COLORS.primary[700]};
  color: ${COLORS.white};
`;

const CounterWrapper = styled.div`
  padding-bottom: 40px;
`;

const Copyright = styled.div`
  max-width: 450px;
  margin: auto;
  padding: 40px;

  line-height: 1.5;
`;

const License = styled(Copyright)`
  padding-top: 0;
  font-size: 13px;
`;

export default Footer;
