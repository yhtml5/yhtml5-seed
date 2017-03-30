import React from 'react'
import {Card, Steps} from 'antd'

function Progress({steps, current}) {
  return (
    <Card className='y-m-b-20'>
      <Steps current={current}>
        {steps.map(item => <Steps.Step key={item.title} title={item.title}/>)}
      </Steps>
    </Card>
  )
}

export default Progress
