import React from 'react'
import { Button } from 'antd'

class Component extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      date: new Date()
    }
    console.clear()
    console.log('lifecyle.constructor')
  }

  componentWillMount() {
    console.log('lifecyle.componentWillMount')
  }

  componentDidMount() {
    console.log('lifecyle.componentDidMount')
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   1000
    // );
    // this.timerID = setTimeout(
    //   () => {
    //     console.log('state change')
    //     this.tick()
    //   },
    //   1000
    // );
  }

  componentWillReceiveProps() {
    console.log('lifecyle.componentWillReceiveProps')
  }

  shouldComponentUpdate() {
    console.log('lifecyle.shouldComponentUpdate')
    return true
  }

  componentWillUpdate() {
    console.log('lifecyle.componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('lifecyle.componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('lifecyle.componentWillUnmount')
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleClick() {
    this.tick()
    console.log('click1, 推荐')
  }

  handleClick2 = () => {
    console.log('click2, 推荐')
  }

  handleClick3() {
    console.log('click3')
  }

  handleClick4() {
    console.log('click4, 不推荐')
  }

  render() {
    console.log('lifecyle.render')
    return (
      <div>
        <h1>It is {this.state.date.toLocaleTimeString()}.</h1>
        <Button type='primary' style={{ margin: '10px' }} onClick={this.handleClick}>Hello, world!</Button>
        <Button type='primary' style={{ margin: '10px' }} onClick={this.handleClick2}>Hello, world!</Button>
        <Button type='primary' style={{ margin: '10px' }} onClick={(e) => this.handleClick3(e, 1)}>Hello, world!</Button>
        <Button type='primary' style={{ margin: '10px' }} onClick={this.handleClick4.bind(this)}>Hello, world!</Button>
      </div>
    );
  }
}

export default Component
