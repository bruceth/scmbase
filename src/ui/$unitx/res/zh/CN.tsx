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
            d: ()=><span className="text-success">ddd</span>,
        },
        c: ()=><span className="text-danger">ccc</span>,
    },
    usq: '$UNITX',
    tuid: '基础档案',
    map: '对照表',
    tuidPlaceHolder: '选择',
    submit: '提交',
    arrNew: '新增',
    arrEdit: '保存',
    entity: {
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
        sectionTeam: {
            label: '大部设置',
        },
        teamPerson: {
            label: '部门员工职位',
            fields: {
            },
            confirmDelete: _.template('真的要删除${label}吗'),
        },
        teamOrganization: {
            label: '部门机构对照表',
        },
        teamPosts: {
            label: '部门职位',
        },
        person: {
            label: '员工',
            fields: {
                name: '姓名',
                nick: '别名',
                given: '名字',
                sur: '姓',
                gender: '性别',
                user: '用户',
            }
        },
        organization: {
            label: '组织结构',
            arrs: {
                post: {
                    label: '职位',
                }
            }
        },
        user: {
            label: '用户'
        }
    }
}
