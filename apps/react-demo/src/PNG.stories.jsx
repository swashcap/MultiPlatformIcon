import React from 'react';

import arrowBottom from 'multiplatformicon-png/dist/ArrowBottom.png';
import arrowLeft from 'multiplatformicon-png/dist/ArrowLeft.png';
import arrowRight from 'multiplatformicon-png/dist/ArrowRight.png';
import arrowTop from 'multiplatformicon-png/dist/ArrowTop.png';

export default {
  args: {
    style: {
      height: 24,
      width: 24,
    },
  },
  title: 'PNG',
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
