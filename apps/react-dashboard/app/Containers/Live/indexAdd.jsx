import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {selectChannels, selectColumns, getLabels} from '../App/task'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import From from './Components/Form.jsx'
import {addLive, resetFormAdd, changeFormAddType, changeFormStep, changeChannel,} from  './task'

function LiveAdd({dispatch, live, app}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('LiveProps: ', live)
  }


  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '页面管理',
    }, {
      name: '直播管理',
    }, {
      name: '新增',
    }]
  }
  const formProps = {
    uploadToken: app.uploadToken,
    selectChannels: app.selectChannels,
    selectColumns: app.selectColumns,
    selectLabels: app.selectLabels,
    formChannel: live.formChannel,
    formColumn: live.formColumn,
    formLabel: live.formLabel,
    formTitle: live.formTitle,
    formMainImage: live.formMainImage,
    formCommunityName: live.formCommunityName,
    formAnnouncer: live.formAnnouncer,
    formDesignImage: live.formDesignImage,
    formImages: live.formImages,
    formSort: live.formSort,
    formStep: live.formStep,
    formArea: live.formArea,
    formAreas: live.formAreas,
    formHome: live.formHome,
    formHomes: live.formHomes,
    formType: live.formType,
    formTypes: live.formTypes,
    formSteps: live.formSteps,
    formIsDone: live.formIsDone,
    formIsHomepage: live.formIsHomepage,
    formVideoView: live.formVideoView,
    formVideoIntroduction: live.formVideoIntroduction,
    formVideoUrl: live.formVideoUrl,
    buttonOkLoading: live.formAddButtonSubmitLoading,
    buttonCancelLoading: live.buttonResetLoading,
    onOk(value){
      notRepeating(() => dispatch(addLive(value)))
    },
    onCancel(values){
      notRepeating(() => dispatch(resetFormAdd(values)))
    },
    changeSelectChannels(id){
      dispatch(changeChannel(id))
    },
    changeSelectColumns(value){
      dispatch(selectColumns(value))
    },
    changeFormType(value){
      dispatch(changeFormAddType(value))
    },
    changeFormStep(value){
      dispatch(changeFormStep(value))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Card className="y-m-b-40">
        <From {...formProps}/>
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    live: state.live,
  }
})(LiveAdd)
