import React from 'react';
import {connect} from 'react-redux';
import {Input, Button, Modal, Form, message} from 'antd'
import './index.pcss'
import {config, getApiUrl} from '../../config.js'
import 'wangeditor'

let editor1, editor2, editor3

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var that = this;
    var id = this.props.id;
    editor1 = new wangEditor(id);
    editor1.config.menus = wangEditor.config.menus.map((item, index) => {
      if (item === 'video') {
        return null
      }
      if (item === 'location') {
        return null
      }
      if (item === 'insertcode') {
        return null
      }
      return item
    })
    editor1.config.uploadImgUrl = getApiUrl() + '/property/image/upload';
    editor1.config.withCredentials = false;
    editor1.create()
    var html = editor1;
    editor1.$txt.html(this.props.html);
    editor1.onchange = function () {
      var content = html.$txt.html();
      that.props.handleEditor(id, content);
    }

  }

  componentWillReceiveProps(nextProps) {
    var that = this;
    var id = this.props.id;
    var html1 = editor1;
    editor1.$txt.html(nextProps.html);
    editor1.onchange = function () {
      var content = html1.$txt.html();
      that.props.handleEditor(id, content);
    }
  }

  render() {
    let style = {
      width: '100%',
      height: '200px'
    }
    return (
      <div>
        <div id={this.props.id} style={style} contentEditable="true"></div>
      </div>
    );
  }
}
export default connect((state) => {
  return {
    editor: state.editor
  }
})(Editor);
