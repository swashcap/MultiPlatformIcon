import React from 'react';

import arrowBottom from 'multiplatformicon-svg/dist/ArrowBottom.svg';
import arrowLeft from 'multiplatformicon-svg/dist/ArrowLeft.svg';
import arrowRight from 'multiplatformicon-svg/dist/ArrowRight.svg';
import arrowTop from 'multiplatformicon-svg/dist/ArrowTop.svg';

export default {
  args: {
    height: 24,
    width: 24,
  },
  title: 'SVG',
};

const Template = (args) => <img aria-hidden {...args} />;

export const ArrowBottom = Template.bind({});
ArrowBottom.args = {
  src: arrowBottom,
};

export const ArrowLeft = Template.bind({});
ArrowLeft.args = {
  src: arrowLeft,
};

export const ArrowRight = Template.bind({});
ArrowRight.args = {
  src: arrowRight,
};

export const ArrowTop = Template.bind({});
ArrowTop.args = {
  src: arrowTop,
};
