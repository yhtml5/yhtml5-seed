import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {validator}from '../../util/validator'
import {changeSelectChannels} from '../App/task'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import {history} from '../../redux/store'
import Formadd from './Components/Formadd.jsx'
import {changeChannelId, searchlabelList, uploadImg, addNav, editNav} from  './task'

function InformationEdit({dispatch, log, app}) {

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '日志管理',
    }, {
      name: '日志编辑',
    }]
  }

  const formProps = {
    selectChannels: app.selectChannels,
    selectColumns: app.selectColumns,
    labellist: log.labellist, //关联标签
    uploadToken: log.uploadToken,
    isUpload: log.isUpload,
    formSureButton: log.formSureButton,
    channel_id: log.channel_id,
    column_id: log.column_id,
    image: log.image,
    intro: log.intro,
    is_reco: log.is_reco,
    keywords: log.keywords,
    label_ids: log.label_ids,
    name: log.name,
    title: log.title,
    view_num: log.view_num,
    sort_order: log.sort_order,
    summary: log.summary,
    id: log.id,
    changeSelectChannels(value){
      dispatch(changeSelectChannels(value))
      dispatch(changeChannelId(value))
      notRepeating(() => dispatch(searchlabelList({channel_id: value, column_id: "0"})))
    },
    changeSelectcolumn(value){
      notRepeating(() => dispatch(searchlabelList(value)))
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    },
    onCancel(){
      history.push('/log')
    },
    onOk(values){
      notRepeating(() => dispatch(editNav(values)))
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
    log: state.log,
    app: state.app,
  }
})(InformationEdit)
