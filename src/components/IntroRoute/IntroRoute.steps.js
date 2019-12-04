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
        These sugars are highly complex molecules that can significantly impact the health of our over health. 
        Overconsumption of sugars can lead to long term consequences include <b>weight gain</b>, <b>impaired brain function</b>, and <b>lack of muscle development</b>. 
        Even more severe, overconsumption of sugars can even lead to chronic illnesses such as <b>diabetes</b>.
        </Paragraph>
        <Paragraph>
        Follow this exploratory visualization to understand what happens to your body when you consume sugar.
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
        All carbohydrates are made up of six-carbon sugars called hexoses. Hexoses include fructose (common in honey and fruit), glucose (common in carbohydrates), and galactose (common in dairy products). These basic sugars make up the building blocks of 6 more complex carbohydrates: sucrose, maltose, lactose, glycogen, cellulose, and starch.
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
          </svg>. This enzyme breaks down complex sugar molecules into smaller sugar molecules, known as polysaccharides 
          <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 293 269" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class='poly-icon' fill-rule="evenodd" clip-rule="evenodd" d="M74.1093 80.6601C74.1093 37.7696 109.531 3 153.227 3C196.922 3 232.344 37.7696 232.344 80.6601C232.344 91.8218 229.945 102.434 225.625 112.026C262.275 118.806 290 150.395 290 188.34C290 231.23 254.578 266 210.883 266C184.341 266 160.852 253.171 146.5 233.486C132.148 253.171 108.659 266 82.1172 266C38.422 266 3 231.23 3 188.34C3 146.063 37.4153 111.677 80.2462 110.701C76.2935 101.46 74.1093 91.3105 74.1093 80.6601Z" fill="#7E0C00"/>
            <path class='poly-icon' d="M225.625 112.026L222.89 110.794C222.512 111.634 222.54 112.601 222.968 113.417C223.395 114.234 224.174 114.808 225.08 114.976L225.625 112.026ZM146.5 233.486L148.924 231.718C148.359 230.944 147.459 230.486 146.5 230.486C145.541 230.486 144.641 230.944 144.076 231.718L146.5 233.486ZM80.2462 110.701L80.3145 113.7C81.3102 113.678 82.2297 113.162 82.7688 112.325C83.3078 111.487 83.3961 110.437 83.0045 109.521L80.2462 110.701ZM153.227 0C107.927 0 71.1093 36.0604 71.1093 80.6601H77.1093C77.1093 39.4788 111.135 6 153.227 6V0ZM235.344 80.6601C235.344 36.0604 198.526 0 153.227 0V6C195.318 6 229.344 39.4788 229.344 80.6601H235.344ZM228.361 113.258C232.851 103.287 235.344 92.2559 235.344 80.6601H229.344C229.344 91.3877 227.039 101.58 222.89 110.794L228.361 113.258ZM225.08 114.976C260.372 121.505 287 151.906 287 188.34H293C293 148.883 264.178 116.107 226.171 109.076L225.08 114.976ZM287 188.34C287 229.521 252.974 263 210.883 263V269C256.182 269 293 232.94 293 188.34H287ZM210.883 263C185.326 263 162.727 250.651 148.924 231.718L144.076 235.253C158.977 255.691 183.356 269 210.883 269V263ZM82.1172 269C109.644 269 134.023 255.691 148.924 235.253L144.076 231.718C130.273 250.651 107.674 263 82.1172 263V269ZM0 188.34C0 232.94 36.8179 269 82.1172 269V263C40.026 263 6 229.521 6 188.34H0ZM80.1779 107.702C35.772 108.713 0 144.379 0 188.34H6C6 147.748 39.0586 114.64 80.3145 113.7L80.1779 107.702ZM71.1093 80.6601C71.1093 91.7245 73.3791 102.275 77.4879 111.881L83.0045 109.521C79.208 100.646 77.1093 90.8966 77.1093 80.6601H71.1093Z" fill="#BC5952"/>
          </svg>
          and disaccharides
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
          Once food reaches the stomach, salivary enzymes (amylase) are inactivated, or denatured.
        </Paragraph>
        <Paragraph>
          From here, pancreatic amylase takes over and resumes digestion. 
          Disaccharides are broken down by intestinal brush border enzymes 
          called disaccharidases. Because the intestines can only absorb 
          the simplest sugars, known as monosaccharides
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
          The monosaccharides <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class='mono-icon' cx="483" cy="689" r="157.5" fill="#7E0C00" stroke="#BC5952" stroke-width="7"/>
            <ellipse class='mono-icon' cx="560.697" cy="774.361" rx="13.5" ry="27" transform="rotate(-140 560.697 774.361)" fill="white"/>
          </svg> passed down from the stomach are absorbed 
          through the wall of the small intestine. The intestines release 
          glucose, a simple sugar which is a very important source of energy, into the bloodstream via various mechanisms along the 
          intestinal walls.
        </Paragraph>
        <Paragraph>
          Some of the monosaccharide units are then transferred to the liver 
          through a blood vessel called the portal vein.
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
          insulin  <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class='insulin-icon' fill-rule="evenodd" clip-rule="evenodd" d="M1061.68 902.306C1060.77 897.982 1063.54 893.741 1067.86 892.832L1114.84 882.965C1119.16 882.057 1123.4 884.825 1124.31 889.149L1133.14 931.195L1134.18 936.124L1139.97 963.671L1119.09 968.057L1114.95 948.339L1094.07 952.724L1098.21 972.442L1077.33 976.828L1071.55 949.281L1071 946.671L1061.68 902.306Z" fill="#0E70B6"/>
                    <path class='insulin-icon' d="M1139.97 963.671L1140.38 965.628L1142.33 965.217L1141.92 963.26L1139.97 963.671ZM1119.09 968.057L1117.13 968.468L1117.54 970.425L1119.5 970.014L1119.09 968.057ZM1114.95 948.339L1116.9 947.928L1116.49 945.97L1114.54 946.382L1114.95 948.339ZM1094.07 952.724L1093.66 950.767L1091.7 951.178L1092.11 953.136L1094.07 952.724ZM1098.21 972.442L1098.62 974.4L1100.58 973.988L1100.17 972.031L1098.21 972.442ZM1077.33 976.828L1075.38 977.239L1075.79 979.196L1077.74 978.785L1077.33 976.828ZM1067.45 890.875C1062.05 892.011 1058.59 897.312 1059.72 902.717L1063.64 901.895C1062.95 898.652 1065.03 895.471 1068.27 894.79L1067.45 890.875ZM1114.43 881.008L1067.45 890.875L1068.27 894.79L1115.25 884.922L1114.43 881.008ZM1126.27 888.738C1125.13 883.333 1119.83 879.872 1114.43 881.008L1115.25 884.922C1118.49 884.241 1121.67 886.318 1122.35 889.561L1126.27 888.738ZM1135.1 930.784L1126.27 888.738L1122.35 889.561L1131.19 931.606L1135.1 930.784ZM1131.19 931.606L1132.22 936.535L1136.14 935.713L1135.1 930.784L1131.19 931.606ZM1132.22 936.535L1138.01 964.082L1141.92 963.26L1136.14 935.713L1132.22 936.535ZM1139.55 961.714L1118.68 966.099L1119.5 970.014L1140.38 965.628L1139.55 961.714ZM1121.05 967.646L1116.9 947.928L1112.99 948.75L1117.13 968.468L1121.05 967.646ZM1094.48 954.682L1115.36 950.296L1114.54 946.382L1093.66 950.767L1094.48 954.682ZM1100.17 972.031L1096.03 952.313L1092.11 953.136L1096.25 972.853L1100.17 972.031ZM1077.74 978.785L1098.62 974.4L1097.8 970.485L1076.92 974.871L1077.74 978.785ZM1069.59 949.692L1075.38 977.239L1079.29 976.417L1073.5 948.87L1069.59 949.692ZM1069.04 947.082L1069.59 949.692L1073.5 948.87L1072.96 946.26L1069.04 947.082ZM1059.72 902.717L1069.04 947.082L1072.96 946.26L1063.64 901.895L1059.72 902.717Z" fill="white" mask="url(#path-47-inside-1)"/>
                    <circle class='insulin-icon' cx="1095.25" cy="906.457" r="1.37037" transform="rotate(-11.8632 1095.25 906.457)" fill="white" stroke="white" stroke-width="2"/>
                    <rect class='insulin-icon' x="1095.82" y="915.836" width="2.74074" height="19.3333" transform="rotate(-11.8632 1095.82 915.836)" fill="white" stroke="white" stroke-width="2"/>
                </svg>, a hormone which helps your cells use sugar as energy. Insulin attaches 
          to and signals cells to absorb sugar; it is often compared to a “key” which
          unlocks cells and permits sugar absorption. 
          Insulin is necessary for the conversion of sugar to energy. 
        </Paragraph>
        <Paragraph>
          Those with Type 1 diabetes are unable to produce insulin because beta 
          cells <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"><path class='beta-icon' d="M920.551 787.787C906.401 786.355 869.86 784.104 855.337 809.275C843.648 829.534 865.181 858.388 881.177 868.825C906.401 885.283 971 879.384 971 852.863C968.539 836.082 955.004 799.575 920.551 787.787Z" fill="#E08835"/>
                <path class='beta-icon' d="M910.446 807.75C912.846 807.75 914.963 808.117 916.796 808.85C918.663 809.55 920.129 810.617 921.196 812.05C922.263 813.45 922.796 815.217 922.796 817.35C922.796 819.75 922.163 821.667 920.896 823.1C919.663 824.5 917.913 825.383 915.646 825.75V825.9C918.479 826.233 920.696 827.15 922.296 828.65C923.929 830.15 924.746 832.417 924.746 835.45C924.746 838.95 923.663 841.667 921.496 843.6C919.329 845.533 916.429 846.5 912.796 846.5C909.563 846.5 906.913 845.983 904.846 844.95V858H897.396V819.25C897.396 816.55 897.963 814.367 899.096 812.7C900.263 811 901.829 809.75 903.796 808.95C905.763 808.15 907.979 807.75 910.446 807.75ZM910.246 813.55C909.279 813.55 908.379 813.733 907.546 814.1C906.713 814.467 906.046 815.117 905.546 816.05C905.079 816.95 904.846 818.25 904.846 819.95V838.85C905.679 839.383 906.663 839.8 907.796 840.1C908.929 840.4 909.963 840.55 910.896 840.55C912.963 840.55 914.496 840.05 915.496 839.05C916.529 838.017 917.046 836.6 917.046 834.8C917.046 832.733 916.429 831.3 915.196 830.5C913.963 829.7 912.463 829.3 910.696 829.3H908.946V823.4H910.246C912.013 823.4 913.296 822.933 914.096 822C914.929 821.033 915.346 819.783 915.346 818.25C915.346 816.683 914.879 815.517 913.946 814.75C913.013 813.95 911.779 813.55 910.246 813.55Z" fill="white"/>
                </svg>in their pancreas are damaged. In contrast, those with Type 2 
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
        When blood sugar dips too low, the liver breaks down glycogen <svg preserveAspectRatio="xMaxYMin meet" width="40" height="20" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"><path class='glycogen-icon' fill-rule="evenodd" clip-rule="evenodd" d="M469 633.677L498.596 599L498.596 599.23H531.661V599.958L561 634.328L531.403 669V668.677H498.479V668.204L469 633.677Z" fill="#3ED8B3"/>
                    <path class='glycogen-icon' d="M498.596 599L507.596 599L507.595 574.592L491.75 593.157L498.596 599ZM469 633.677L462.154 627.835L457.167 633.679L462.155 639.521L469 633.677ZM498.596 599.23L489.596 599.23L489.596 608.23H498.596V599.23ZM531.661 599.23H540.661V590.23H531.661V599.23ZM531.661 599.958H522.661V603.277L524.815 605.801L531.661 599.958ZM561 634.328L567.845 640.171L572.833 634.328L567.845 628.485L561 634.328ZM531.403 669H522.403V693.405L538.248 674.843L531.403 669ZM531.403 668.677H540.403V659.677H531.403V668.677ZM498.479 668.677H489.479V677.677H498.479V668.677ZM498.479 668.204H507.479V664.884L505.323 662.36L498.479 668.204ZM491.75 593.157L462.154 627.835L475.846 639.52L505.442 604.843L491.75 593.157ZM507.596 599.229L507.596 599L489.596 599L489.596 599.23L507.596 599.229ZM531.661 590.23H498.596V608.23H531.661V590.23ZM540.661 599.958V599.23H522.661V599.958H540.661ZM524.815 605.801L554.155 640.171L567.845 628.485L538.506 594.115L524.815 605.801ZM554.155 628.485L524.558 663.157L538.248 674.843L567.845 640.171L554.155 628.485ZM540.403 669V668.677H522.403V669H540.403ZM498.479 677.677H531.403V659.677H498.479V677.677ZM489.479 668.204V668.677H507.479V668.204H489.479ZM462.155 639.521L491.634 674.047L505.323 662.36L475.845 627.833L462.155 639.521Z" fill="#C8FFF2" mask="url(#path-3-inside-2)"/></svg>, which is primarily stored in liver cells. 
        This broken-down glycogen is released into the bloodstream. So when you’re hungry, your liver is 
        helping you keep up your energy!
        </Paragraph>
        <Paragraph>
        If your blood sugar is high, the liver filters some of the glucose from the 
        blood and stores it as glycogen for later usage.
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
        As they move through the digestive system, sugars are broken down, digested, and absorbed. But what happens after? Try selecting different foods below to see how consumption of each sugar might affect your body.        </Paragraph>
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
