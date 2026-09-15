const React = require('react');

const SvgComponent = (props) => {
  const cleanProps = { ...props };
  delete cleanProps.xmlns;
  return React.createElement('svg', cleanProps, cleanProps.children);
};

const mockComponent = (tag) => {
  const Comp = ({ children, ...props }) => {
    // Map react-native-svg props to web SVG attributes if needed
    const cleanProps = { ...props };
    return React.createElement(tag, cleanProps, children);
  };
  Comp.displayName = tag;
  return Comp;
};

const elements = [
  'Circle', 'Ellipse', 'G', 'Text', 'TSpan', 'TextPath', 'Path', 'Polygon',
  'Polyline', 'Line', 'Rect', 'Use', 'Image', 'Symbol', 'Defs', 'LinearGradient',
  'RadialGradient', 'Stop', 'ClipPath', 'Pattern', 'Mask', 'Marker',
  'Svg', 'SvgUri', 'SvgXml', 'Filter', 'FeGaussianBlur', 'FeMerge', 'FeMergeNode',
  'FeColorMatrix', 'FeDropShadow', 'FeOffset', 'FeBlend', 'FeComposite'
];

const mockSvg = {
  __esModule: true,
  default: SvgComponent,
  Svg: SvgComponent,
};

elements.forEach((el) => {
  const htmlTag = el.startsWith('Fe') 
    ? 'fe' + el.slice(2).toLowerCase() 
    : el.toLowerCase();
  mockSvg[el] = mockComponent(htmlTag);
});

module.exports = mockSvg;
