import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import { partial, noop } from 'lodash';

import Row from './Row';
import Separator from './Separator';
import SectionHeader from './SectionHeader';

const { func, shape } = PropTypes;

export default class List extends Component {
  static propTypes = {
    rowDataGetter: func.isRequired,
    onRowPress: func.isRequired,
    data: shape({}).isRequired
  }

  static defaultProps = {
    onRowPress: noop,
    data: {}
  }

  constructor(props) {
    super(props);

    const datasource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      // sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: datasource.cloneWithRows(props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
      });
    }
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Row
        content={ this.props.rowDataGetter(rowData, sectionId, rowId) }
        key={ `${sectionId}-${rowId}` }
        onPress={ partial(this.props.onRowPress, rowData, sectionId, rowId) }
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
        enableEmptySections // FIXME: Always need a section header somehow
      />
    );
  }
}
