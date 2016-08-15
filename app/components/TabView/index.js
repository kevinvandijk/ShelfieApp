import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { partial } from 'lodash';

const { func, shape, string, arrayOf } = PropTypes;

function TabView(props) {
  const tabs = props.tabs.map(tab => {
    const active = props.active === tab.key;
    return (
      <TouchableOpacity
        key={ tab.title }
        onPress={ partial(props.onPress, tab.key) }
        style={ [styles.tab, (active ? styles.tabActive : null)] }
      >
        <Text style={ [styles.text, (active ? styles.textActive : null)] }>
          { tab.title.toUpperCase() }
        </Text>
      </TouchableOpacity>
    );
  });

  return <View style={ styles.container }>{ tabs }</View>;
}

TabView.propTypes = {
  active: string,
  onPress: func.isRequired,
  tabs: arrayOf(shape({
    key: string.isRequired,
    title: string.isRequired
  }))
};

export default TabView;
