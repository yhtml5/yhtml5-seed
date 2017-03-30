import React from 'react'
import {Icon} from 'antd'
import './index.less'

function Calculator({
  formulaResult,
  calculatorClear, calculatorBack, calculatorInput
}) {
  console.log('props', {
    formulaResult,
    calculatorClear, calculatorBack, calculatorInput
  })

  return (
    <div className="y-calculator">
      <div className="y-result">
        <i className="y-cl-f04134">{formulaResult}</i>
        {/*<p>测试默认值：车位面积为 10平方，房屋收费面积 90平方</p>*/}
      </div>
      <p className="y-title">计算器：</p>
      <div>
          <span className="y-sm y-b-r-n y-cl-f04134"
                onClick={() => calculatorClear()}>清空</span>
        <span className="y-lg y-b-r-n"
              onClick={() => calculatorBack()}>
                {/*<Icon type="arrow-left"/>*/}
          后退</span>
        <span className="y-sm"
              onClick={() => calculatorInput('+')}>+</span>
      </div>
      <div className="y-m-t-n-1">
          <span className="y-sm y-b-r-n"
                onClick={() => calculatorInput('7')}>7</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('8')}>8</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('9')}>9</span>
        <span className="y-sm"
              onClick={() => calculatorInput('-')}>-</span>
      </div>
      <div className="y-m-t-n-1">
          <span className="y-sm y-b-r-n"
                onClick={() => calculatorInput('4')}>4</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('5')}>5</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('6')}>6</span>
        <span className="y-sm"
              onClick={() => calculatorInput('*')}>*</span>
      </div>
      <div className="y-m-t-n-1">
          <span className="y-sm y-b-r-n"
                onClick={() => calculatorInput('1')}>1</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('2')}>2</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('3')}>3</span>
        <span className="y-sm"
              onClick={() => calculatorInput('/')}>/</span>
      </div>
      <div className="y-m-t-n-1">
          <span className="y-sm y-b-r-n"
                onClick={() => calculatorInput('0')}>0</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput('(')}>(</span>
        <span className="y-sm y-b-r-n"
              onClick={() => calculatorInput(')')}>)</span>
        <span className="y-sm"
              onClick={() => calculatorInput('.')}>.</span>
      </div>
      <div className="y-m-t-n-1">
          <span className="y-xxl"
                onClick={() => calculatorInput('H')}>房屋收费面积 (H)</span>
        {/*<span className="y-lg"*/}
        {/*onClick={() => calculatorInput('C')}>车位面积 (C)</span>*/}
      </div>
    </div>
  )
}
export default Calculator
