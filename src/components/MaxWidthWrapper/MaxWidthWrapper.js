// @flow
import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS, BREAKPOINT_SIZES, MAX_WIDTH } from '../../constants';

import { getPadding } from './MaxWidthWrapper.helpers';

type Props = {
  noPadding: boolean,
  noPaddingOnMobile: boolean
};

const MaxWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || MAX_WIDTH.base};
  margin-left: 100px;
  margin-right: 10px;
  padding-left: ${getPadding};

  @media ${BREAKPOINTS.sm} {
    max-width: 100%;
  }

  @media ${BREAKPOINTS.lg} {
    max-width: ${BREAKPOINT_SIZES.md + 'px'};
  }
`;

// ${props => props.maxWidth || MAX_WIDTH.base};

export default (props: Props) => <MaxWidthWrapper {...props} />;
