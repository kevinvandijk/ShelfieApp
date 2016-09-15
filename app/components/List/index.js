import React, { Component, PropTypes } from 'react';
import { ListView, Text, View } from 'react-native';
import styles from './styles';
const { string } = PropTypes;

const Row = (props) => {
  return (
    <View style={ styles.rowContainer }>
      <Text style={ styles.rowText }>{ props.text }</Text>
    </View>
  );
};

Row.propTypes = {
  text: string.isRequired
};

const SectionHeader = (props) => {
  return (
    <View style={ styles.headerContainer }>
      <Text style={ styles.headerText }>{ props.children }</Text>
    </View>
  );
};

SectionHeader.propTypes = {
  children: string.isRequired
};

const Separator = () => {
  return <View style={ styles.separator } />;
};

export default class List extends Component {
  constructor() {
    super();
    const datasource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    });

    const data = {

    };

    this.state = {
      dataSource: datasource.cloneWithRowsAndSections(data)
    };
  }

  renderRow(rowData, sectionId, rowId) {
    return <Row { ...rowData } key={ `${sectionId}-${rowId}` } />;
  }

  renderSectionHeader(sectionData, sectionId) {
    return <SectionHeader key={ sectionId }>{ sectionId }</SectionHeader>;
  }

  renderSeparator(sectionId, rowId) {
    return <Separator key={ `${sectionId}-${rowId}` } />;
  }

  render() {
    return (
      <ListView
        dataSource={ this.state.dataSource }
        renderRow={ this.renderRow }
        renderSectionHeader={ this.renderSectionHeader }
        renderSeparator={ this.renderSeparator }
      />
    );
  }
}
