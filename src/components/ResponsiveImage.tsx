import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const ResponsiveImage = ({ src, alt, width, height, ...rest }) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      paddingTop: `${(height / width) * 100}%`,
    }}
  >
    <Image src={src} alt={alt} fill {...rest} />
  </div>
);

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
export default ResponsiveImage;
