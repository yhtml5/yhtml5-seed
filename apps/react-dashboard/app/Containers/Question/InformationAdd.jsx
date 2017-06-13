import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {changeSelectChannels} from '../App/task'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import {history} from '../../redux/store'
import Formadd from './Components/Formadd.jsx'
import {changeChannelId, uploadImg, addNav} from  './task'

function InformationAdd({dispatch, question, app}) {

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '问答管理',
    }, {
      name: '新增问答',
    }]
  }

  const formProps = {
    selectChannels: app.selectChannels,
    selectColumns: app.selectColumns,
    labellist: question.labellist, //关联标签
    uploadToken: question.uploadToken,
    isUpload: question.isUpload,
    formSureButton: question.formSureButton,
    channel_id: question.channel_id,
    column_id: question.column_id,
    question_author: question.question_author,
    title: question.title,
    user_img: question.user_img,
    intro: question.intro,
    answer: question.answer,
    is_reco: question.is_reco,
    sort_order: question.sort_order,
    changeSelectChannels(value){
      dispatch(changeSelectChannels(value))
      dispatch(changeChannelId(value))
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    },
    onCancel(){
      history.push('/question')
    },
    onOk(values){
      notRepeating(() => dispatch(addNav(values)))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Card className="y-m-b-40">
        <Formadd {...formProps}/>
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    question: state.question,
    app: state.app,
  }
})(InformationAdd)
