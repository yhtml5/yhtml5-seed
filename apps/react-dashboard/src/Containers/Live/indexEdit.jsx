import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import From from './Components/Form.jsx'
import {confirmDelete, addLive, editNav, editLive, resetEdit, changeFormEditType, changeFormStepEdit, changeChannel} from  './task'
import {selectChannels, selectColumns} from '../App/task'

function LiveEdit({dispatch, live, app}) {
  console.log('LiveProps: ', live)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '页面管理',
    }, {
      name: '直播管理',
    }, {
      name: '编辑',
    }]
  }
  const formProps = {
    uploadToken: app.uploadToken,
    selectChannels: app.selectChannels,
    selectColumns: app.selectColumns,
    selectLabels: app.selectLabels,
    formId: live.formId,
    formChannel: live.formChannel,
    formColumn: live.formColumn,
    formLabel: live.formLabel,
    formAreas: live.formAreas,
    formHomes: live.formHomes,
    formTypes: live.formTypes,
    formSteps: live.formSteps,
    formTitle: live.formEditTitle,
    formMainImage: live.formEditMainImage,
    formCommunityName: live.formEditCommunityName,
    formAnnouncer: live.formEditAnnouncer,
    formDesignImage: live.formEditDesignImage,
    formImages: live.formEditImages,
    formSort: live.formEditSort,
    formStep: live.formEditStep,
    formArea: live.formEditArea,
    formHome: live.formEditHome,
    formType: live.formEditType,
    formIsDone: live.formEditIsDone,
    formIsHomepage: live.formEditIsHomepage,
    formVideoView: live.formEditVideoView,
    formVideoIntroduction: live.formEditVideoIntroduction,
    formVideoUrl: live.formEditVideoUrl,
    buttonOkLoading: live.formEditButtonSubmitLoading,
    buttonCancelLoading: live.buttonResetLoading,
    onOk(value){
      notRepeating(() => dispatch(editLive(value)))
    },
    onCancel(values){
      notRepeating(() => dispatch(resetEdit(values)))
    },
    changeSelectChannels(id){
      dispatch(changeChannel(id))
    },
    changeSelectColumns(value){
      dispatch(selectColumns(value))
    },
    changeFormType(value){
      // dispatch(changeFormAddType(value))
    },
    changeFormStep(value){
      dispatch(changeFormStepEdit(value))
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
})(LiveEdit)
