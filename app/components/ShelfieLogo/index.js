import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import styles from './styles';
const { number, object, string, oneOfType, bool } = PropTypes;

const ShelfieLogo = (props) => {
  const width = props.size || props.width;
  const height = props.size || props.height;

  return (
    <View style={ props.style }>
      { /* eslint-disable */ }
      <Svg width={ width } height={ height } viewBox="122 65 1214 1215">
        <G fill="none" fillRule="evenodd">
          <Path d="M729 65c335.2 0 607 272 607 607.5S1064.2 1280 729 1280s-607-272-607-607.5S393.8 65 729 65z" fill={ props.color } />
          <Path d="M741.2 1036.9V294.7c0-17.7 18.7-29.1 34.3-20.9l247.8 129.9c7.7 4.1 12.6 12.1 12.6 20.9l.8 483c0 8.8-4.9 16.9-12.7 21l-248.5 129.3c-15.7 8.1-34.3-3.3-34.3-21z" fill="#FFF" />
          <Path d="M741.2 1036.9V294.7c0-17.7 18.7-29.1 34.3-20.9l247.8 129.9c7.7 4.1 12.6 12.1 12.6 20.9l.8 483c0 8.8-4.9 16.9-12.7 21l-248.5 129.3c-15.7 8.1-34.3-3.3-34.3-21z" stroke="#FFF" />
          <Path d="M710 283.6v766.2c0 9.4-9.9 15.4-18.3 11.1l-267-139.1c-4.1-2.1-6.7-6.4-6.7-11.1l-.7-488.7c0-4.7 2.6-9 6.7-11.1l267.8-138.4c8.3-4.3 18.2 1.7 18.2 11.1z" fill="#FFF" />
          <Path d="M710 283.6v766.2c0 9.4-9.9 15.4-18.3 11.1l-267-139.1c-4.1-2.1-6.7-6.4-6.7-11.1l-.7-488.7c0-4.7 2.6-9 6.7-11.1l267.8-138.4c8.3-4.3 18.2 1.7 18.2 11.1z" stroke="#FFF" />
          <Path d="M649.5 175v961H628l-.1-961zM575.8 298.9v718.4c0 14.2-20.9 15.3-22.4 1.1 0-.4-.1-.8-.1-1.1l-.1-717.9c0-.4 0-.8.1-1.1l.1-.6c1.5-14 22.4-12.9 22.4 1.2zM514.1 195v936L496 954.6l-.1-584.2z" fill={ props.color } />
          <G fill={ props.color }>
            <Path d="M462.8 239.2v807.7l-80.2-152.2-.2-504.1z" />
          </G>
          <G fill={ props.color }>
            <Path d="M994.4 1046.9V297l80.9 141.3.2 468z" />
          </G>
        </G>
      </Svg>
      { /* eslint-enable */ }
      {
        !props.hideText &&
          <Text style={ props.textStyle }>Shelfie</Text>
      }
    </View>
  );
};

ShelfieLogo.propTypes = {
  width: number,
  height: number,
  size: number,
  color: string,
  hideText: bool,
  style: oneOfType([object, number]),
  textStyle: oneOfType([object, number])
};

ShelfieLogo.defaultProps = {
  size: 100,
  color: '#E24741',
  textStyle: styles.text
};

export default ShelfieLogo;
