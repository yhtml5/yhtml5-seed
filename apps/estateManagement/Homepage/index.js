'use strick';
import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router';
import * as actions from '../../actions/homePage';
import {
  Breadcrumb,
  message, Card, Col, Row, Form, Button
} from 'antd';
import './index.less';
class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
    }
  }

  componentDidMount() {
    let {
      dispatch,
      editHouse,
      layout
    } = this.props;
    if (this.props.layout.communityId!="") {
      dispatch(actions.getIndex({
        community_id: layout.communityId
      }));

    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout.communityId != nextProps.layout.communityId) {
      let {
        dispatch,
        editHouse,
        layout
      } = this.props;
      dispatch(actions.getIndex({
        community_id: nextProps.layout.communityId
      }));
    }
  }

  // 收款链接
  collection(e) {
    location.href = "#/collections"
  }

  //快速入口
  quickLink(mark,listid, val) {
    this.props.dispatch(actions.verify({
      key:listid
    }, () => {
      var link = "#/" + mark;
      window.location.href = link
    }))
  }
//待办事项
todoLink(todoid,listid,val){
  this.props.dispatch(actions.verify({
    key:listid
  }, () => {
    var link = "#/" + "repairView"+"?id="+todoid;
    location.href = link
  }))
}
  render() {
    let {
      dispatch,
      homePage
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 8
      },
    }
    let {
      all_amount,
      month_amount,
      today_amount,
      repair_list,
    } = homePage
    return (
      <div className="page-content">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>工作台</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span="8">
            <Card className="Margin-right12 color1">
              <i className="iconfont icon-leijishoukuan icon-f26f8d f15"></i>
              <span className='Margin-left8 f15'>累计收益</span>
              <div>
                <i className="iconfont icon-renminbi f20"></i>
                <span className='f36'>{homePage.all_amount}</span>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card className="Margin-right12 color2">
              <i className="iconfont icon-benyueshoukuan icon-5682dc f15"></i>
              <span className='Margin-left8 f15'>本月收款</span>
              <div>
                <i className="iconfont icon-renminbi f20"></i>
                <span className='f36'>{homePage.month_amount}</span>
              </div>
            </Card>
          </Col>
          <Col span="8">
            <Card className="color3">
              <i className="iconfont icon-jinrishoukuan icon-ffab3b f15"></i>
              <span className='Margin-left8 f15'>今日收款</span>
              <div>
                <i className="iconfont icon-renminbi f20"></i>
                <span className='f36'>{homePage.today_amount}</span>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="Margin-top32">
          <Col span="8">
            <Card className="Margin-right12">
              <div className='f15 blod'>收银台</div>
              <div  className="Button-containter">
                <img className="collection_img"   src="http://o7ej9iew1.bkt.clouddn.com/zhihuishequ_text/1489737702636.png"/>
              </div>
              <div className="Button-containter">
                <Button className="width-128" type="primary" size="large" onClick={this.quickLink.bind(this, 'collections',11)}>收款</Button>
              </div>
            </Card>
          </Col>
          <Col span="16" className='min-height-309'>
            <Card>
              <div className='f15 blod'>待办事项</div>
              <div className="Margin-top22">
                <ul>
                  {repair_list.map((value,index)=>{
                    return  <li className='lineheight-43' key={index}><div className="cicle"></div><div className="dolist">{value.repair_content}</div><span><a onClick={this.todoLink.bind(this,value.repair_id,51)}>去处理  >> </a></span>
                  </li>
                })}
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="Margin-top32">
          <Col span="24">
            <Card className='padding-bottom-54'>
              <div className='f15 blod'>快速入口</div>
              <Col span='8'>
                <div className="Button-containter" onClick={this.quickLink.bind(this, 'generateBill/step1',41)}>
                  <i className="iconfont icon-xinzengzhangdan f96 icon-95b0ea"></i>
                  <p className='quick-text'>新增物业费账单</p>
                </div>
              </Col>
              <Col span='8'>
                <div className="Button-containter" onClick={this.quickLink.bind(this, 'announcementAdd',53)}>
                  <i className="iconfont icon-xinzenggonggao f96 icon-43cfbc"></i>
                  <p className='quick-text'>新增物业公告</p>
                </div>
              </Col>
              <Col span='8'>
                <div className="Button-containter" onClick={this.quickLink.bind(this, 'residentsManageAdd',32)}>
                  <i className="iconfont icon-xinzengzhuhu f96 icon-faa78d"></i>
                  <p className='quick-text'>新增住户</p>
                </div>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => {
  return {
    homePage: state.homePage,
    layout: state.layout
  }
})(homePage);
