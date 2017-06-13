import React from 'react'
import { Upload, Icon, Modal, message, Button } from 'antd'
import { store } from '../../redux/store'
import { updateLiveState } from '../../Containers/Live/task'
import { isStringEmpty,isStringNotEmpty } from '../../util/validator'

/**
 * Todo
 *
 * @param {string} id
 * @param {array} value
 * @param {number} max
 * @param {function} onChange => urls
 *
 */

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    // this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.getFileList(this.props.value)
    }
    // process.env.NODE_ENV === 'production' || console.log('PicturesWallInit')
  }

  getFileList(value) {
    return (Array.isArray(value))
      ? value.map((value, index) => {
        return {
          uid: -index - 1,
          status: 'done',
          url: value,
        }
      })
      : []
  }

  getInitialState() {
    // process.env.NODE_ENV === 'production' || console.log('PicturesWallGetInitialState', this.props)
    // this.setState({fileList: this.getFileList(this.props.value)})
  }

  componentWillMount() {
    console.log('componentWillMount', this.props)
    // this.setState({ fileList: this.getFileList(this.props.value) })
  }

  componentDidMount() {
    process.env.NODE_ENV === 'production' || console.log('PicturesWallComponentDidMount', this.props)
    // this.setState({ fileList: this.getFileList(this.props.value) })
  }

  componentWillReceiveProps(nextProps) {
    process.env.NODE_ENV === 'production' || console.log('PicturesWallComponentWillReceiveProps', this.props, nextProps)

    // if (this.props.value && this.props.value.length !== nextProps.value.length) {
    //   this.setState({ fileList: this.getFileList(nextProps.value) })
    // }

    if (this.props.value && nextProps.value && this.props.value.length !== nextProps.value.length) {
      this.setState({ fileList: this.getFileList(nextProps.value) })
    }
  }

  componentWillUnmount() {
    // process.env.NODE_ENV === 'production' || console.log('PicturesWallComponentWillUnmount')
    // this.setFileList('delete')
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = (e) => {
    const fileList = e.fileList
    let urls = []
    this.setState({ fileList })
    for (let i = 0; i < e.fileList.length; i++) {
      if (e.fileList[i].status === 'done' && isStringNotEmpty(e.fileList[i].url)) {
        urls.push(e.fileList[i].url)
      } else if (e.fileList[i].status === 'done' && e.fileList[i].response) {
        let data = e.fileList[i].response.data
        urls.push(data.imgPath + data.message)
      }
    }
    console.log('urls', e, urls)

    this.props.onChange(urls)
  }


  // handleChange = (e) => {
  //   // console.log('handleChange', e)
  //   let fileList = e.fileList
  //   this.setState({ fileList })
  //   let urls = []

  //   // let urls = e.fileList.map((value, index) => {
  //   //   if (value.status === 'done' && value.url) {
  //   //     console.warn('url', index)
  //   //     return value.url
  //   //   } else if (value.status === 'done' && value.response) {
  //   //     let data = value.response.data
  //   //     console.warn('response', value.response, index)
  //   //     return data.imgPath + data.message
  //   //   }
  //   // })

  //   for (let i = 0; i < e.fileList.length; i++) {
  //     if (e.fileList[i].status === 'done' && e.fileList[i].url) {
  //       urls.push(e.fileList[i].url)
  //       console.warn('url', i)
  //     } else if (e.fileList[i].status === 'done' && e.fileList[i].response) {
  //       let data = e.fileList[i].response.data
  //       urls.push(data.imgPath + data.message)
  //       console.warn('response', i)
  //     }
  //   }

  //   console.warn('handleChange', urls, e, fileList.length)

  //   this.props.onChange(urls)
  // }

  beforeUpload(file, fileList) {
    console.log('beforeUpload', file, fileList)
    const isJPEG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isJPG = file.type === 'image/jpg'
    const newDate = new Date().getTime()
    const strs = file.type.split("/")

    if (!isJPG && !isJPEG && !isPNG) {
      message.error('只能上传.jpeg,.jpg,.png图片')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请上传小于 2MB 的图片!')
      return false
    }

    this.setState({
      name: `jiazhuanghoutai/${(this.props.id) ? this.props.id : ''}-${newDate}.${strs[1]}`,
      files: file
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const max = (this.props.max) ? this.props.max : 1
    const isMax = (fileList) ? fileList.length >= max : false

    const uploadButton = (
      <div>
        <Icon type="upload" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )
    return (
      <div className="clearfix" style={{ minHeight: '104px' }}>
        <Upload
          action="http://up.qiniu.com/"
          data={{ token: store.getState().app.uploadToken, key: this.state.name, file: this.state.files }}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          valuePropName='fileList'
          accept="image/jpeg,image/png,image/jpg,image/gif"
        >
          {isMax ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default PicturesWall
