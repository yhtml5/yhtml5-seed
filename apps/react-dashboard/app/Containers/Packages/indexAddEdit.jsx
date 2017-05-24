import React from 'react'
import { Card, Pagination, Button } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { notRepeating } from '../../util/util'
import { history } from '../../redux/store'
import { validator } from '../../util/validator'
import { selectChannels, selectColumns, getLabels } from '../App/task'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Header from './Components/Header.jsx'
import From from './Components/Form.jsx'
import FormStyles from './Components/FormStyles.jsx'
import ModalIntro from './Components/ModalIntro.jsx'
import ModalColumns from './Components/ModalColumns.jsx'
import styles from './Components/index.pcss'
import {
  updateState, preview, toggleStatus, toggleRecommendation, add, edit,
  selectColumnsStyle, addColumn, editColumn, deleteColumn,
} from './task'

function Component({ dispatch, props, app }) {
  process.env.NODE_ENV === 'production' || console.log('PackagesProps: ', props)

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '内容管理',
    }, {
      name: '套餐管理',
    }, {
      name: props.formType === 'edit' ? '编辑' : '新增',
    }]
  }
  const headerProps = {
    status: props.formStatus,
    isReco: props.formIsReco,
    packageId: props.packageId,
    headerPreviewDisabled: props.headerPreviewDisabled,
    headerOnlineDisabled: props.headerOnlineDisabled,
    headerRecommendDisabled: props.headerRecommendDisabled,
    onPreview() {
      dispatch(preview())
    },
    toggleStatus(id, status) {
      console.log(id, status)
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    toggleRecommendation(id, status) {
      console.log(id, status)
      notRepeating(() => dispatch(toggleRecommendation(id, status)))
    },
    openIntro() {
      dispatch(updateState({ modalIntroVisible: true }))
    },
    onBack() {
      history.push('/packages')
    }
  }
  const formProps = {
    formName: props.formName,
    formSort: props.formSort,
    formImage: props.formImage,
    formPrice: props.formPrice,
    formQuota: props.formQuota,
    formSurplus: props.formSurplus,
    buttonOkLoading: props.formSaveLoading,
    buttonOkDisabled: props.formSaveDisabled,
    // buttonCancelLoading: props.buttonResetLoading,
    onOk(value) {
      notRepeating(
        () => {
          if (props.formType === 'add') {
            dispatch(add(value))
          } else if (props.formType === 'edit') {
            dispatch(edit(value))
          } else {
            console.error('onOk fail!')
          }
        }
      )
    },
    onCancel(values) {
      console.log('onCancel')
    },
  }

  const buttonProps = {
    className: styles.button,
    type: "primary",
    onClick() {
      notRepeating(() => dispatch(updateState({ modalColumsVisible: true })))
    },
    loading: false
  }

  const modalIntroProps = {
    visible: props.modalIntroVisible,
    onOK() {
      dispatch(updateState({ modalIntroVisible: false }))
    }
  }

  const modalColumnsProps = {
    id: props.modalColumsId,
    data: props.modalColumnsStyles,
    visible: props.modalColumsVisible,
    onOK() {
      dispatch(selectColumnsStyle())
    },
    onCancel() {
      dispatch(updateState({ modalColumsVisible: false }))
    },
    onChange(id) {
      dispatch(updateState({ modalColumsId: id }))
    },
  }

  const formStylesProps = {
    formType: props.formType,
    columnsStyles: props.columnsStyles,
    onOk(value) {
      notRepeating(
        () => {
          if (value.formId > 80000) {
            dispatch(addColumn(value))
          } else {
            dispatch(editColumn(value))
          }
        }
      )
    },
    onCancel(value) {
      notRepeating(() => dispatch(deleteColumn(value)))
    },
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <Header {...headerProps}></Header>
        <From {...formProps} />
        <hr className={styles.hr} />
        <FormStyles {...formStylesProps} />
        <Button {...buttonProps}>新增栏目</Button>
        <ModalIntro{...modalIntroProps} />
        <ModalColumns{...modalColumnsProps} />
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.packages,
  }
})(Component)
