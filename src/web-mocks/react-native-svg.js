const React = require('react');

const SvgComponent = (props) => {
  return React.createElement('svg', props, props.children);
};

const mockComponent = (tag) => {
  const Comp = (props) => React.createElement(tag, props, props.children);
  Comp.displayName = tag;
  return Comp;
};

const elements = [
  'Circle', 'Ellipse', 'G', 'Text', 'TSpan', 'TextPath', 'Path', 'Polygon',
  'Polyline', 'Line', 'Rect', 'Use', 'Image', 'Symbol', 'Defs', 'LinearGradient',
  'RadialGradient', 'Stop', 'ClipPath', 'Pattern', 'Mask', 'Marker',
  'Svg', 'SvgUri', 'SvgXml', 'Filter', 'FeGaussianBlur', 'FeMerge', 'FeMergeNode',
  'FeColorMatrix', 'FeDropShadow', 'FeOffset', 'FeBlend'
];

const mockSvg = {
  __esModule: true,
  default: SvgComponent,
  Svg: SvgComponent,
};

elements.forEach((el) => {
  const htmlTag = el.toLowerCase().startsWith('fe') ? el : el.toLowerCase();
  mockSvg[el] = mockComponent(htmlTag);
});

module.exports = mockSvg;
