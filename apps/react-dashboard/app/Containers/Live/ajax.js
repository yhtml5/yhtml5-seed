import ajax from '../../util/ajax'
import {updateState} from './task'
import {updateState as updateAppState} from '../App/task'

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */

async function ajaxLiveList(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/live/list',
      {
        channel_id: params.searchChannel,
        column_id: params.searchColumn,
        id: params.searchNumber,
        name: params.searchTitle,
        status: params.searchStatus,
        page: params.tableCurrent,
        rows: 10,
      },
      resolve,
      resolve,
      (response) => {
        resolve()
        dispatch(updateState({
          tableData: response.data.list,
          tableTotals: (response.data.totals) ? Number(response.data.totals) : 0
        }))
      }
    )
  )
}

async function ajaxLiveSettings(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/live/setting', {}, resolve, resolve,
      (response) => {
        resolve()
        dispatch(updateState({
          formAreas: response.data.area_types,
          formTypes: response.data.live_types,
          formSteps: response.data.stage_types,
          formHomes: response.data.house_types,
        }))
      }
    )
  )
}
async function ajaxDeleteLive(id) {
  await new Promise((resolve) =>
    ajax(
      'website/live/remove', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/live/toggle', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddLive(values) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/live/create',
      {
        area: values.formArea,
        channel_id: values.formChannel,
        column_id: values.formColumn,
        label_ids: values.formLabel,
        design_images: values.formDesignImage,
        done: values.formIsDone,
        house_name: values.formCommunityName,
        house_type: values.formHome,
        image: (values.formMainImage) ? values.formMainImage : '',
        images: values.formImages,
        images_type: values.formStep,
        is_reco: values.formIsHomepage,
        name: values.formTitle,
        promulgator: values.formAnnouncer,
        sort_order: values.formSort,
        type: values.formType,
        video_intro: values.formVideoIntroduction,
        video_url: values.formVideoUrl,
        view_num: values.formVideoView,
      },
      reject, reject, resolve
    )
  )
}

async function ajaxEdit(dispatch, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('ajaxEdit', values)
  }

  await new Promise((resolve, reject) =>
    ajax(
      'website/live/edit',
      {
        area: values.formArea,
        channel_id: values.formChannel,
        column_id: values.formColumn,
        design_images: values.formDesignImage,
        done: values.formIsDone,
        house_name: values.formCommunityName,
        house_type: values.formHome,
        image: (values.formMainImage) ? values.formMainImage : '',
        images: values.formImages,
        images_type: values.formStep,
        is_reco: values.formIsHomepage,
        label_ids: values.formLabel,
        live_id: values.id,
        name: values.formTitle,
        promulgator: values.formAnnouncer,
        sort_order: values.formSort,
        type: values.formType,
        video_intro: values.formVideoIntroduction,
        video_url: values.formVideoUrl,
        view_num: values.formVideoView,
      },
      reject, reject, resolve
    )
  )
}

async function ajaxEditInfo(dispatch, id) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/live/view',
      {
        live_id: id
      },
      reject, reject,
      (response) => {
        resolve()
        dispatch(updateState({
          formChannel: (response.data.channel_id) ? response.data.channel_id : undefined,
          formColumn: (response.data.column_id && response.data.column_id !== '0') ? response.data.column_id : undefined,
          formLabel: (response.data.labels) ? response.data.labels.map((value, index) => value.id) : undefined,
          formEditStep: (response.data.images_type) ? response.data.images_type : 0,
          formEditImages: response.data.images,
          formEditTitle: response.data.name,
          formEditMainImage: response.data.image ? [response.data.image] : [],
          formEditCommunityName: response.data.house_name,
          formEditAnnouncer: response.data.promulgator,
          formEditDesignImage: response.data.design_images,
          formEditSort: response.data.sort_order,
          formEditArea: response.data.area,
          formEditHome: response.data.house_type,
          formEditIsHomepage: response.data.is_reco,
          formEditIsDone: response.data.done,
          formEditType: response.data.type,
          formEditVideoIntroduction: response.data.video_intro,
          formEditVideoUrl: response.data.video_url,
          formEditVideoView: response.data.view_num,
        }))
        dispatch(updateAppState({
          // selectLabels: (response.data.labels) ? response.data.labels : undefined,
        }))
      }
    )
  )
}

export {ajaxLiveList, ajaxDeleteLive, ajaxEditStatus, ajaxAddLive, ajaxEditInfo, ajaxEdit, ajaxLiveSettings}
