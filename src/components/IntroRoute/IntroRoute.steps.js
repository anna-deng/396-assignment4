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

import './intro-route.css'


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
          called salivary amylase          
          <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class='salivary-amalyse-icon' d="M841 387C841 441.483 795.752 486 739.5 486C683.248 486 638 441.483 638 387C638 332.517 683.248 288 739.5 288C795.752 288 841 332.517 841 387Z" fill="#4939FF" stroke="#94A1FF" stroke-width="18"/>
            <ellipse class='salivary-amalyse-icon' cx="698.542" cy="347.836" rx="10.5" ry="21" transform="rotate(40 698.542 347.836)" fill="white"/>
          </svg>. This enzyme breaks down polysaccharides 
          <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 293 269" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class='poly-icon' fill-rule="evenodd" clip-rule="evenodd" d="M74.1093 80.6601C74.1093 37.7696 109.531 3 153.227 3C196.922 3 232.344 37.7696 232.344 80.6601C232.344 91.8218 229.945 102.434 225.625 112.026C262.275 118.806 290 150.395 290 188.34C290 231.23 254.578 266 210.883 266C184.341 266 160.852 253.171 146.5 233.486C132.148 253.171 108.659 266 82.1172 266C38.422 266 3 231.23 3 188.34C3 146.063 37.4153 111.677 80.2462 110.701C76.2935 101.46 74.1093 91.3105 74.1093 80.6601Z" fill="#7E0C00"/>
            <path class='poly-icon' d="M225.625 112.026L222.89 110.794C222.512 111.634 222.54 112.601 222.968 113.417C223.395 114.234 224.174 114.808 225.08 114.976L225.625 112.026ZM146.5 233.486L148.924 231.718C148.359 230.944 147.459 230.486 146.5 230.486C145.541 230.486 144.641 230.944 144.076 231.718L146.5 233.486ZM80.2462 110.701L80.3145 113.7C81.3102 113.678 82.2297 113.162 82.7688 112.325C83.3078 111.487 83.3961 110.437 83.0045 109.521L80.2462 110.701ZM153.227 0C107.927 0 71.1093 36.0604 71.1093 80.6601H77.1093C77.1093 39.4788 111.135 6 153.227 6V0ZM235.344 80.6601C235.344 36.0604 198.526 0 153.227 0V6C195.318 6 229.344 39.4788 229.344 80.6601H235.344ZM228.361 113.258C232.851 103.287 235.344 92.2559 235.344 80.6601H229.344C229.344 91.3877 227.039 101.58 222.89 110.794L228.361 113.258ZM225.08 114.976C260.372 121.505 287 151.906 287 188.34H293C293 148.883 264.178 116.107 226.171 109.076L225.08 114.976ZM287 188.34C287 229.521 252.974 263 210.883 263V269C256.182 269 293 232.94 293 188.34H287ZM210.883 263C185.326 263 162.727 250.651 148.924 231.718L144.076 235.253C158.977 255.691 183.356 269 210.883 269V263ZM82.1172 269C109.644 269 134.023 255.691 148.924 235.253L144.076 231.718C130.273 250.651 107.674 263 82.1172 263V269ZM0 188.34C0 232.94 36.8179 269 82.1172 269V263C40.026 263 6 229.521 6 188.34H0ZM80.1779 107.702C35.772 108.713 0 144.379 0 188.34H6C6 147.748 39.0586 114.64 80.3145 113.7L80.1779 107.702ZM71.1093 80.6601C71.1093 91.7245 73.3791 102.275 77.4879 111.881L83.0045 109.521C79.208 100.646 77.1093 90.8966 77.1093 80.6601H71.1093Z" fill="#BC5952"/>
          </svg>
          into disaccharides
          <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class='di-icon' fill-rule="evenodd" clip-rule="evenodd" d="M719.5 521.482C691.377 545.499 654.882 560 615 560C526.082 560 454 487.918 454 399C454 310.082 526.082 238 615 238C654.882 238 691.377 252.501 719.5 276.518C747.623 252.501 784.118 238 824 238C912.918 238 985 310.082 985 399C985 487.918 912.918 560 824 560C784.118 560 747.623 545.499 719.5 521.482Z" fill="#7E0C00"/>
            <path class='di-icon' d="M719.5 521.482L724.046 516.159L719.5 512.276L714.954 516.159L719.5 521.482ZM719.5 276.518L714.954 281.841L719.5 285.724L724.046 281.841L719.5 276.518ZM714.954 516.159C688.051 539.134 653.153 553 615 553V567C656.61 567 694.703 551.863 724.046 526.805L714.954 516.159ZM615 553C529.948 553 461 484.052 461 399H447C447 491.784 522.216 567 615 567V553ZM461 399C461 313.948 529.948 245 615 245V231C522.216 231 447 306.216 447 399H461ZM615 245C653.153 245 688.051 258.866 714.954 281.841L724.046 271.195C694.703 246.137 656.61 231 615 231V245ZM724.046 281.841C750.949 258.866 785.847 245 824 245V231C782.39 231 744.297 246.137 714.954 271.195L724.046 281.841ZM824 245C909.052 245 978 313.948 978 399H992C992 306.216 916.784 231 824 231V245ZM978 399C978 484.052 909.052 553 824 553V567C916.784 567 992 491.784 992 399H978ZM824 553C785.847 553 750.949 539.134 724.046 516.159L714.954 526.805C744.297 551.863 782.39 567 824 567V553Z" fill="#BC5952" mask="url(#path-1-inside-1)"/>
            <ellipse class='di-icon' cx="523.697" cy="314.361" rx="13.5" ry="27" transform="rotate(-140 523.697 314.361)" fill="white"/>
          </svg>
          , thereby beginning sugar digestion.
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
          monosaccharides
          <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class='mono-icon' cx="483" cy="689" r="157.5" fill="#7E0C00" stroke="#BC5952" stroke-width="7"/>
            <ellipse class='mono-icon' cx="560.697" cy="774.361" rx="13.5" ry="27" transform="rotate(-140 560.697 774.361)" fill="white"/>
          </svg>, the stomach must break all the poly and disaccharides 
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
          {/* Pancreas's response to digestion{' '} */}
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
