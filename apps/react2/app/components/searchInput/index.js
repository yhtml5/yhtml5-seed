'use strict';
import React from 'react';
import {
  Input,
  Button
} from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false
    }
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }
  render() {

    const {
      style,
      size
    } = this.props,
      btnCls = classNames({
        'ant-search-btn': true,
        'ant-search-btn-noempty': !!this.state.value.trim(),
      }),
      searchCls = classNames({
        'ant-search-input': true,
        'ant-search-input-focus': this.state.focus,
      });
    return (
      <div className="ant-search-input-wrapper" style={style}>
              <InputGroup className={searchCls}>
                <Input value={this.state.value} onChange={this.handleInputChange.bind(this)}
                  onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} onPressEnter={this.handleSearch.bind(this)}
                placeholder={this.props.placeholder}/>
                <div className="ant-input-group-wrap">
                  <Button icon="search" className={btnCls} size={size} style={{height:26}} onClick={this.handleSearch.bind(this)} />
                </div>
              </InputGroup>
            </div>
    );
  }
}
export default SearchInput;