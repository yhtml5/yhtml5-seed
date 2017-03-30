import React from 'react'
import {Card, Button, Checkbox} from 'antd'
import {validator} from '../../app/validator'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.onMark = this.onMark.bind(this);
    this.state = {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      options: []
    }
  }

  componentDidMount() {
    let arr1 = this.props.value.children
    let arr2 = []
    for (let i = 0; i < arr1.length; i++) {
      arr2 = arr2.concat(arr1[i].name)
    }
    this.setState({
      options: arr2
    })
  }

  onMark() {
    this.props.onMark({
      index: this.props.index,
      group: this.props.value.group,
      children: this.state.checkedList
    })
  }

  handleChange(checkedList) {
    console.clear()
    console.log(checkedList)
    this.setState({
      checkedList,
      // indeterminate: !!checkedList.length && (checkedList.length < this.props.value.children.length),
      indeterminate: !!checkedList.length && (checkedList.length < this.state.options.length),
      checkAll: checkedList.length === this.state.options.length,
    }, () => this.onMark())
  }

  handleCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? this.state.options : [],
      indeterminate: false,
      checkAll: e.target.checked,
    }, () => this.onMark());
  }

  render() {

    return (
      <div className="y-selector">
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.handleCheckAllChange}
          checked={this.state.checkAll}
        >{this.props.value.group}</Checkbox>
        <div className="y-hr"></div>
        <Checkbox.Group
          key={this.props.index}
          options={this.state.options}
          value={this.state.checkedList}
          onChange={this.handleChange}
        />
      </div>)
  }
}

export default Selector

