import React, { Component } from 'react';
import { func, shape, bool, instanceOf, oneOfType } from 'prop-types';
import { ListView, RefreshControl } from 'react-native';
import { partial, noop } from 'lodash';

import Row from './Row';
import Separator from './Separator';

export default class List extends Component {
  static propTypes = {
    rowDataGetter: func.isRequired,
    rowComponent: oneOfType([instanceOf(Component), func]),
    headerComponent: oneOfType([instanceOf(Component), func]),
    onRowPress: func.isRequired,
    data: shape({}).isRequired,
    renderSectionHeader: func,
    onRefresh: func,
    refreshing: bool,
    onChangeVisibleRows: func
  }

  static defaultProps = {
    onRowPress: noop,
    rowComponent: Row,
    data: {},
    refreshing: false,
    onChangeVisibleRows: null,
    renderSectionHeader: null
  }

  constructor(props) {
    super(props);

    const datasource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: datasource.cloneWithRowsAndSections(props.data),
      refreshing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.data)
      });
    }
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <this.props.rowComponent
        key={ `${sectionId}-${rowId}` }
        onPress={ partial(this.props.onRowPress, rowData, sectionId, rowId) }
        { ...this.props.rowDataGetter(rowData, sectionId, rowId) }
      />
    );
  }

  renderSeparator = (sectionId, rowId) => {
    return <Separator key={ `${sectionId}-${rowId}` } />;
  }

  render() {
    const refreshControl = this.props.onRefresh
      ? <RefreshControl refreshing={ this.props.refreshing } onRefresh={ this.props.onRefresh } />
      : null;

    return (
      <ListView
        onChangeVisibleRows={ this.props.onChangeVisibleRows }
        dataSource={ this.state.dataSource }
        renderRow={ this.renderRow }
        renderSectionHeader={ this.props.renderSectionHeader }
        // renderSeparator={ this.renderSeparator }
        refreshControl={ refreshControl }
      />
    );
  }
}
