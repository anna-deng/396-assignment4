// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

import Spacer from '../Spacer';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import Link from '../Link';
import MaxWidthWrapper from '../MaxWidthWrapper';

const IntroRouteEnd = () => {
  return (
    <Wrapper>
      <MaxWidthWrapper>
        <Spacer size={128} />
        <CongratsHeading>
          How do different sugars affect your body differently?
        </CongratsHeading>
        <LimitedParagraph>
          blah blhablhalbhlahblhalbhlahblha
        </LimitedParagraph>
        <Spacer size={172} />
      </MaxWidthWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 64px;
  background: ${COLORS.gray[100]};
`;

const CongratsHeading = styled(Heading)`
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -2px;
  text-align: center;
  margin-bottom: 60px;

  @media ${BREAKPOINTS.sm} {
    font-size: 48px;
  }

  @media ${BREAKPOINTS.mdMin} {
    font-size: 56px;
  }
`;

const LetterSquash = styled.span`
  letter-spacing: -7px;
`;

const LimitedParagraph = styled(Paragraph)`
  max-width: 600px;
  font-size: 26px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 42px;
`;

export default IntroRouteEnd;
