import React from 'react';
import _ from 'lodash';

export default {
  x: {
    no: '编号',
    team: '部门',
    staff: '员工',
    noStaff: '无员工',
    post: '职位',
    noPost: '无职位',
    a: 'aaa',
    b: {
      s: 'sss',
      d: () => <span className="text-success">ddd</span>,
    },
    c: () => <span className="text-danger">ccc</span>,
  },
  none: "无",
  usq: 'scmbasedata',
  tuid: '基础档案',
  map: '对照表',
  tuidPlaceHolder: '选择',
  sheet: '单据',
  history: '流水账',
  submit: '提交',
  arrNew: '新增',
  arrEdit: '保存',
  entity: {
    product: {
      label: '商品信息',
      fields: {
        discription: '名称',
        packType: '计量类型',
      },
      arrs: {
        pack: {
          label: '包装单位',
          fields: {
            ratio: '换算率(相对基本单位)',
            name: '名称'
          }
        }
      }
    },
    packtype: {
      label: '计量类型',
      fields: {
        name: '计量单位(如 g,ml,台,个)',
        discription: '计量类型(如 重量，长度,单体)',
      },
    },
    price: {
      label: '价格表',
    },
    message: {
      label: '消息-message',
      arrNew: '新增消息',
      arrEdit: '保存消息',
      fields: {
        fromUser: '发送人',
        fromUnit: '发送部门',
        type: '类型',
        date: '日期',
        subject: '主题',
        discription: '描述',
        content: '内容'
      },
    },
    getMessage: {
      label: '获取Message',
      submit: '获取消息',
      fields: {
        msg: '消息'
      }
    },
    newMessage: {
      label: '新建消息',
      fields: {
        type: '类型',
        subject: '主题',
      },
      arrs: {
        to: {
          label: '发送',
          newSubmit: '新增to',
          editSumbit: '保存to',
        },
        cc: {
          label: '抄送',
          newSubmit: '新增cc',
          editSumbit: '保存cc',
        }
      }
    },
    teamPerson: {
      label: '部门员工职位',
      fields: {
      },
      confirmDelete: _.template('真的要删除${label}吗'),
    },
    user: {
      label: '用户'
    }
  }
}
