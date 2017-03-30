import {Modal} from 'antd'

let buttonStatus = true

function FormulaDeleteConfirm({onDelete, value}) {
  console.log({value})
  Modal.confirm({
    title: '确认删除该公式？',
    onOk() {
      if (buttonStatus) {
        buttonStatus = false
        setTimeout(() => buttonStatus = true, 2000)
        return new Promise((resolve, reject) => {
          onDelete(value.id, resolve, reject)
        }).catch(() => console.log('Oops errors!'))
      }
    },
    onCancel() {
    },
  });
}

export default FormulaDeleteConfirm
