import React, { Component, PropTypes } from 'react';
import { ListView, Text, View, TouchableHighlight } from 'react-native';
import styles from './styles';
const { string, func } = PropTypes;
import { Actions } from 'react-native-router-flux'

const Row = (props) => {
  return (
    <TouchableHighlight style={ styles.rowContainer } onPress={ props.onPress }>
      <Text style={ styles.rowText }>{ props.text }</Text>
    </TouchableHighlight>
  );
};

Row.propTypes = {
  text: string.isRequired,
  onPress: func
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
      1979: [
        { text: 'Wouter speelt in de tuin' },
        { text: 'Wouter zwemt in het water' },
        { text: 'Alexander presenteert het nieuws' },
        { text: 'Vakantie Portugal' },
        { text: 'Wouter rookt een sigaretje' },
        { text: 'Speeldband' }
      ],
      1980: [
        { text: 'Wouter & Kevin spelen samen' },
        { text: 'Verjaardag Catrien' },
        { text: 'Kerst bij Oma' },
        { text: 'Wouter maakt al het speelgoed stuk' },
        { text: 'Pasen bij tante Anneke' },
        { text: 'Vakantie Duitsland' },
        { text: 'Wouter voetballen bij Margriet' },
        { text: 'Wouter springt op en neer op het gras' },
        { text: 'Wouter vermaakt zich kostelijk'}
      ],
      2016: [
        { text: 'Wouter begint project KIP' },
        { text: 'Wouter eet een kippetje' },
        { text: 'Wouter wordt supergroot en sterk van kip' },
        { text: 'Wouter start Shelfie' },
        { text: 'Wouter kijkt deze video ' }
      ]
    };

    this.state = {
      dataSource: datasource.cloneWithRowsAndSections(data)
    };
  }

  onRowPress() {
    Actions['mainWatch']();
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Row
        { ...rowData }
        key={ `${sectionId}-${rowId}` }
        onPress={ this.onRowPress }
      />
    );
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
