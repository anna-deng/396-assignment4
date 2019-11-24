import React, { Fragment } from 'react';

import { COLORS, DEFAULT_WAVEFORM_SHAPE } from '../../constants';
import { roundTo } from '../../utils';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Heading from '../Heading';
import Emphasized from '../Emphasized';
import Sidebar from '../Sidebar';
import FrequencyGraph from '../FrequencyGraph';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import MountWhenVisible from '../MountWhenVisible';
import RevealableAnswer from '../RevealableAnswer';
import WaveformEquation from '../WaveformEquation';
import UnorderedList from '../UnorderedList';
import KeyboardCharacter from '../KeyboardCharacter';
import PortraitOnly from '../PortraitOnly';
import LandscapeOnly from '../LandscapeOnly';
import Link from '../Link';
import SliderIcon from '../SliderIcon';


import type {
  WaveformShape,
  HarmonicsForShape,
  WaveformAdditionType,
} from '../../types';

export type IntroStep =
  | 'title'
  | 'intro'
  | 'types-of-sugar'
  | 'intro-digestive'
  | 'mouth-and-esophagus'
  | 'stomach'
  | 'small-large-intestine'
  | 'pancreas'
  | 'liver'
  | 'conclusion';

export const INTRO_STEPS: Array<IntroStep> = [
  'title',
  'intro',
  'types-of-sugar',
  'intro-digestive',
  'mouth-and-esophagus',
  'stomach',
  'small-large-intestine',
  'pancreas',
  'liver',
  'conclusion'
];

export type StepData = {
  id: string,

  // Waveform parameters
  showWaveform: boolean,
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
  isPlaying: boolean,
  waveformShape: WaveformShape,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  showYAxisIntercept: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
  showAmplitudeSlider: boolean,
  showFrequencySlider: boolean,
  frequencySliderMin: number,
  frequencySliderMax: number,
  frequencySliderStep: number,
  showCycleIndicator: boolean,
  showVolumeControls: boolean,

  // WaveformAddition params
  useWaveformAddition: boolean,
  waveformAdditionType: WaveformAdditionType,
  showNumOfHarmonicsSlider: boolean,
  showConvergenceSlider: boolean,
  showPhaseSlider: boolean,
  harmonicsForShapeOverride: HarmonicsForShape,
  numOfHarmonicsOverride: number,
  convergenceOverride: number,
  phaseOverride: number,

  // Section parameters
  getMargin: (windowWidth: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  xsmall: windowHeight => windowHeight * 0.15,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const defaults: StepData = {
  showWaveform: true,
  frequencyOverride: null,
  amplitudeOverride: null,
  isPlaying: false,
  waveformShape: DEFAULT_WAVEFORM_SHAPE,
  waveformColor: COLORS.primary[500],
  waveformOpacity: 1,

  showXAxis: true,
  showYAxis: true,
  showXAxisLabels: false,
  showYAxisLabels: false,
  showYAxisIntercept: false,
  xAxisOpacity: 1,
  yAxisOpacity: 1,
  showAmplitudeSlider: false,
  showFrequencySlider: false,
  frequencySliderMin: 0.5,
  frequencySliderMax: 3,
  frequencySliderStep: 0.1,
  showCycleIndicator: false,
  showVolumeControls: true,

  useWaveformAddition: false,
  waveformAdditionType: 'harmonics',
  showNumOfHarmonicsSlider: false,
  showConvergenceSlider: false,
  showPhaseSlider: false,

  getMargin: marginFunctions.large,
};

const waveformPosition = (
  <Fragment>
    <PortraitOnly>below</PortraitOnly>
    <LandscapeOnly>to the left</LandscapeOnly>
  </Fragment>
);

export const steps = {
  title: {
    ...defaults,
    frequencyOverride: 1,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.none,
    children: <Header />,
  },
  'intro': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    showVolumeControls: false,
    getMargin: marginFunctions.small,
    children: (
      <Fragment>
        <Paragraph>
        Carbohydrates make up approximately <b>half</b> the calories consumed by the average American. 
        These sugars are highly complex molecules that can significantly impact the health of our bodies. 
        These long term consequences include <b>weight gain</b>, <b>impaired brain function</b>, and <b>lack of muscle development</b>. 
        Overconsumption of sugars can even lead to chronic illnesses such as <b>diabetes</b>.
        </Paragraph>
        <Paragraph>
        Follow this exploratory visualization to understand what happens to your body when you consume sugar!
        </Paragraph>
      </Fragment>
    ),
  },
  'types-of-sugar': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    getMargin: marginFunctions.small,
    children: ({ orientation }) => (
      <Fragment>
        <Heading>What are the different types of sugar we consume?</Heading>
        <Paragraph>
        All carbohydrates are made up of six-carbon sugars (hexoses). 
        These sugars are known as fructose, glucose, and galactose. 
        These basic sugars make up the building blocks of 6 more complex carbohydrates: 
        sucrose, maltose, lactose, glycogen, cellulose, and starch.
        </Paragraph>
      </Fragment>
    ),
  },
  'intro-digestive': {
    ...defaults,
    children: (
      <Fragment>
        <Heading>How does our body digest these sugars?</Heading>
        <Paragraph>
          As soon as these sugars enter our body, they go through the digestive system to be broken down and absorbed by our bodies for energy.
          Follow the process below!
        </Paragraph>
      </Fragment>
    ),
  },
  'mouth-and-esophagus': {
    ...defaults,
    children: (
      <Fragment>
        <SectionTitle>1. Mouth and Esophagus</SectionTitle>
        <Paragraph>
          Sugars, like starches, are broken down by a mouth enzyme 
          called salivary amylase. This enzyme breaks down polysaccharides 
          into disaccharides, thereby beginning sugar digestion.
        </Paragraph>
        <Paragraph>
          From here, sugars are passed to the esophagus, a muscular tube 
          which funnels foods from the mouth to the stomach.
        </Paragraph>
      </Fragment>
    ),
  },
  'stomach': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    showXAxis: false,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <SectionTitle>2. Stomach</SectionTitle>
        <Paragraph>
          Once food reaches the stomach, salivary enzymes (amylase) are denatured.
        </Paragraph>
        <Paragraph>
          From here, pancreatic amylase takes over and resumes digestion. 
          Disaccharides are broken down by intestinal brush border enzymes 
          called disaccharidases. Because the intestines can only absorb 
          monosaccharides, the stomach must break all the poly and disaccharides 
          before passing them onto the intestines.
        </Paragraph>
      </Fragment>
    ),
  },
  'small-large-intestine': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    showXAxis: false,
    getMargin: marginFunctions.xsmall,
    children: (
      <Fragment>
        <SectionTitle>3. Small/Large Intestine</SectionTitle>
        <Paragraph>
          The monosaccharides passed down from the stomach are absorbed 
          through the wall of the small intestine. The intestines release 
          glucose into the bloodstream via various mechanisms along the 
          intestinal walls.
        </Paragraph>
        <Paragraph>
          Some of the monosaccharide units are then transferred to the liver 
          through the portal vein.
        </Paragraph>
      </Fragment>
    ),
  },
  'pancreas': {
    ...defaults,
    frequencyOverride: 1,
    getMargin: marginFunctions.xsmall,
    showYAxisLabels: true,
    showXAxis: false,
    showAmplitudeSlider: true,
    children: (
      <Fragment>
        <SectionTitle>4. Pancreas</SectionTitle>
        <Paragraph>
          Pancreas's response to digestion{' '}
          {/* <SliderIcon fieldName="amplitude" />{' '} */}
          After sugar is released into the bloodstream, the pancreas releases 
          insulin to help your cells use the sugar as energy. Insulin attaches 
          to and signals cells to absorb sugar, often compared to a “key” that 
          unlocks cells to allow sugar to enter cells and be used as energy. 
          Insulin is necessary for the conversion of sugar to energy. 
        </Paragraph>
        <Paragraph>
          Those with type 1 diabetes are unable to produce insulin because beta 
          cells in their pancreas are damaged. In contrast, those with type 2 
          diabetes are resistant to insulin. In both cases, people with diabetes 
          need insulin shots to help their bodies process glucose.
        </Paragraph>

        <br />

        {/* <Sidebar type="summary">
          <Paragraph>
            A waveform is a <strong>graph</strong> that shows a wave's change in{' '}
            <strong>displacement</strong> over <strong>time</strong>. A
            waveform's <strong>amplitude</strong> controls the wave's maximum
            displacement.
          </Paragraph>
        </Sidebar> */}
      </Fragment>
    ),
  },
  'liver': {
    ...defaults,
    amplitudeOverride: 1,
    frequencyOverride: 2,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    showCycleIndicator: true,
    children: (
      <Fragment>
        <SectionTitle>5. Liver</SectionTitle>
        <Paragraph>
        If your blood sugar dips too low, liver breaks down glycogen (stored in __) 
        and releases them into the bloodstream. So when you’re hungry, your liver is 
        helping you keep up your energy!
        </Paragraph>
        <Paragraph>
        If your blood sugar is high, liver filters some of the glucose from the 
        blood and stores them as glycogen for later usage.
        </Paragraph>
      </Fragment>
    ),
  },
  'conclusion': {
    ...defaults,
    getMargin: marginFunctions.xsmall,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    frequencyOverride: 2,
    children: (
      <Fragment>
        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
        As they move through the digestive system, sugars are broken down, digested, and absorbed. But what happens after sugars are absorbed? Try selecting different foods below to see how consumption of each sugar might affect your body.
        </Paragraph>
      </Fragment>
    ),
  },
  over: {
    ...defaults,
    showWaveform: false,
    showVolumeControls: false,
    isPlaying: false,
    getMargin: marginFunctions.none,
    children: null,
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));
