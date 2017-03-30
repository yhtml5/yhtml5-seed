import {Modal} from 'antd'

function DetectionConfirm({onDelete, value}) {
  console.log({value})

  Modal.confirm({
    title: '检测账单',
    content: '检测到有为完成账单，是否去确认并发布？',
    okText: '查看',
    cancelText: '取消账单',
    onOk() {
      return new Promise((resolve, reject) => {
        onDelete(value.id, resolve, reject)
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {

    },
  })
}

export default DetectionConfirm
