import React, { useEffect } from "react";
import "@/utils/flowChart";
import "./FlowChart.less";
// @ts-ignore
import $ from "jquery";

/*
  * @description: 流程图组件
  * @param {*}
 */
//
const FlowChart: React.FC = () => {
  const flowChart = $.lrworkflow;
  useEffect(() => {
    // 初始化流程图
    $("#workflow").lrworkflow({
      // 点击节点事件回调函数
      openNode: function(node: any, nodelist: any) {
        console.log("node", node);
        console.log("nodelist", nodelist);
      },
      // 点击线条事件回调函数
      openLine: function(line: any, node: any) {
        console.log("line", line);
        console.log("node", node);
        // currentLine = line;
        // fromNode = node;
        // learun.layerForm({
        //     id: 'LineForm',
        //     title: '线条信息设置',
        //     url: top.$.rootUrl + '/WorkFlow/Scheme/LineForm?layerId=layer_Form',
        //     width: 700,
        //     height: 550,
        //     callBack: function (id) {
        //         return top[id].acceptClick(function () {
        //             $('#step-3').lrworkflowSet('updateLineName', { lineId: currentLine.id });
        //         });
        //     }
        // });
      }
    });
    $("#workflow").lrworkflowSet("set",
      {
        data: {
          "nodes": [{
            "id": "23ae2cec-b790-2006-41fc-7738f1b9d3e9",
            "name": "开始",
            "left": 118,
            "top": 243,
            "type": "startround",
            "width": 52,
            "height": 52,
            "wfForms": [{
              "type": "0",
              "formId": "",
              "field": "",
              "name": "项目申报",
              "url": "/ProjectModule/Project/LXForm",
              "appurl": "",
              "id": "d96fe7a3-48a4-b652-d423-d3a7bcb226ba"
            }],
            "isNext": "2",
            "isTitle": "2"
          }, {
            "id": "28632536-3115-32a8-733e-16c3528fa13c",
            "name": "部门审核",
            "left": 306,
            "top": 237,
            "type": "stepnode",
            "width": 150,
            "height": 65,
            "auditors": [{
              "auditorId": "c74291e7-f350-4337-9b1f-3945e185610a",
              "condition": "1",
              "auditorName": "部门领导",
              "type": "2",
              "id": "1e453630-afca-a919-360f-2938466a5dc1",
              "jfnum": 1
            }],
            "wfForms": [{
              "type": "0",
              "formId": "",
              "field": "",
              "name": "项目申报",
              "url": "/ProjectModule/Project/LXForm",
              "appurl": "",
              "id": "e01f0285-3433-f4f1-5e34-9ab84a178fbd",
              "authorize": {},
              "jfnum": 1
            }],
            "btnlist": [],
            "isAllAuditor": "1",
            "auditorAgainType": "1",
            "auditorType": "1",
            "auditExecutType": "1",
            "isSign": "2",
            "isBatchAudit": "1",
            "agreeGz": "",
            "noPeopleGz": "1",
            "timeoutNotice": "",
            "timeoutInterval": "",
            "timeoutAction": "",
            "btnList": [{
              "name": "同意",
              "code": "agree",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "5c8a8dca-6c87-a185-2b88-0138b6f8f736",
              "jfnum": 1
            }, {
              "name": "退回",
              "code": "disagree",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "1fcdeba0-927a-77e1-3e6c-3a8d584547a7",
              "jfnum": 2
            }, {
              "name": "保存",
              "code": "savedraft",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "fb609f9b-0188-c694-cc74-f11c15a492ba",
              "jfnum": 3
            }],
            "auditorsDes": [],
            "tipDesContent": "项目为涉密的话，不需要走编制实施方案流程，直接到验收节点"
          }, {
            "id": "8cbfe5d9-48be-3e26-329b-85ec65ce6b20",
            "name": "结束",
            "left": 1022,
            "top": 246,
            "type": "endround",
            "width": 52,
            "height": 52
          }, {
            "id": "3c713399-eed3-2e47-cc7d-cff89e6bc3c4",
            "name": "列入计划",
            "left": 578,
            "top": 237,
            "type": "stepnode",
            "width": 150,
            "height": 65,
            "auditors": [{
              "auditorId": "831862ac-9bbe-4db3-9cca-055c112bd34c",
              "condition": "",
              "auditorName": "计划科研部审核",
              "type": "2",
              "id": "0c663d8e-7484-2c40-ff3b-32c119359175",
              "jfnum": 1
            }],
            "wfForms": [{
              "type": "0",
              "formId": "",
              "field": "",
              "name": "项目申报",
              "url": "/ProjectModule/Project/LXForm",
              "appurl": "",
              "id": "1a459d30-f7aa-368a-385c-855594d96f3b",
              "authorize": {},
              "jfnum": 1
            }],
            "btnlist": [],
            "isAllAuditor": "1",
            "auditorAgainType": "1",
            "auditorType": "1",
            "auditExecutType": "1",
            "isSign": "2",
            "isBatchAudit": "1",
            "agreeGz": "",
            "noPeopleGz": "1",
            "timeoutNotice": "",
            "timeoutInterval": "",
            "timeoutAction": "",
            "btnList": [{
              "name": "同意",
              "code": "agree",
              "isHide": "2",
              "isSign": "2",
              "next": "2",
              "id": "10ce3146-8b7d-8355-5bc7-dc65ec6bc41a",
              "jfnum": 1
            }, {
              "name": "保存",
              "code": "savedraft",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "bbab538a-7d03-7a57-17ef-394e40650241",
              "jfnum": 2
            }, {
              "name": "退回",
              "code": "disagree",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "15bb3862-958b-6907-2743-723a90db3964",
              "jfnum": 3
            }],
            "auditorsDes": [],
            "tipDesContent": "项目为涉密的话，不需要走编制实施方案流程，直接到验收节点 233"
          }, {
            "id": "8c9c8651-e6f3-c0a3-5a90-fbe1ceaa99bb",
            "name": "审批",
            "left": 794,
            "top": 238,
            "type": "stepnode",
            "width": 150,
            "height": 65,
            "auditors": [],
            "wfForms": [{
              "type": "0",
              "formId": "",
              "field": "",
              "name": "项目申报",
              "url": "/ProjectModule/Project/LXForm",
              "appurl": "",
              "id": "8284d486-8116-5c4d-0d38-32d9522f0070",
              "authorize": {},
              "jfnum": 1
            }],
            "btnlist": [],
            "isAllAuditor": "1",
            "auditorAgainType": "1",
            "auditorType": "1",
            "auditExecutType": "1",
            "isSign": "2",
            "isBatchAudit": "1",
            "auditorsDes": [],
            "agreeGz": "",
            "noPeopleGz": "1",
            "timeoutNotice": "",
            "timeoutInterval": "",
            "timeoutAction": "",
            "btnList": [{
              "name": "列入计划",
              "code": "inplan",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "c7e41903-531a-0e3e-a129-db215b87ae36",
              "jfnum": 1
            }, {
              "name": "退回",
              "code": "disagree",
              "isHide": "2",
              "isSign": "2",
              "next": "1",
              "id": "bc031e93-b46b-0a87-1799-f4f7e25219f0",
              "jfnum": 2
            }],
            "tipDesContent": ""
          }],
          "lines": [{
            "id": "65766ee1-9bb4-ef11-4a18-c325090cb7ed",
            "from": "23ae2cec-b790-2006-41fc-7738f1b9d3e9",
            "to": "28632536-3115-32a8-733e-16c3528fa13c",
            "sp": "right",
            "ep": "left",
            "name": "",
            "color": "1",
            "type": "sl",
            "operationType": "ioc",
            "iocName": "StartProjectDeclare",
            "iocNameR": ""
          }, {
            "id": "994ba176-d75e-99f3-3d59-1b4106eb1367",
            "from": "28632536-3115-32a8-733e-16c3528fa13c",
            "to": "3c713399-eed3-2e47-cc7d-cff89e6bc3c4",
            "sp": "right",
            "ep": "left",
            "name": "",
            "color": "1",
            "type": "sl",
            "strategy": "2",
            "agreeList": "agree",
            "operationType": "ioc",
            "dbId": "",
            "strSql": "",
            "strSqlR": "",
            "iocName": "LeaderAuditProject",
            "iocNameR": ""
          }, {
            "id": "5b007952-d80f-2bbb-e977-670e6c50dc38",
            "from": "28632536-3115-32a8-733e-16c3528fa13c",
            "to": "23ae2cec-b790-2006-41fc-7738f1b9d3e9",
            "sp": "top",
            "ep": "top",
            "name": "退回",
            "color": "2",
            "type": "tb",
            "strategy": "2",
            "agreeList": "disagree",
            "operationType": "sql",
            "dbId": "",
            "strSql": "",
            "strSqlR": "",
            "M": 157
          }, {
            "id": "b8e0ae98-8345-eb1d-6d54-4fbaaf0fd21f",
            "from": "3c713399-eed3-2e47-cc7d-cff89e6bc3c4",
            "to": "28632536-3115-32a8-733e-16c3528fa13c",
            "sp": "bottom",
            "ep": "bottom",
            "name": "退回",
            "color": "2",
            "type": "tb",
            "M": 410,
            "strategy": "2",
            "agreeList": "disagree",
            "operationType": "ioc",
            "dbId": "",
            "strSql": "",
            "strSqlR": "",
            "iocName": "PlanBack",
            "iocNameR": ""
          }, {
            "id": "407fb16b-26b1-79c9-8f93-d9c35d3708a1",
            "from": "3c713399-eed3-2e47-cc7d-cff89e6bc3c4",
            "to": "8c9c8651-e6f3-c0a3-5a90-fbe1ceaa99bb",
            "sp": "right",
            "ep": "left",
            "name": "",
            "color": "1",
            "type": "sl",
            "strategy": "2",
            "agreeList": "agree",
            "operationType": "sql",
            "strSql": "",
            "strSqlR": ""
          }, {
            "id": "4dce8bc1-9b2b-d22e-36f8-cf43af3cf463",
            "from": "8c9c8651-e6f3-c0a3-5a90-fbe1ceaa99bb",
            "to": "8cbfe5d9-48be-3e26-329b-85ec65ce6b20",
            "sp": "right",
            "ep": "left",
            "name": "",
            "color": "1",
            "type": "sl",
            "strategy": "2",
            "agreeList": "inplan",
            "operationType": "ioc",
            "iocName": "FinishProjectDeclare",
            "iocNameR": ""
          }, {
            "id": "173f132d-386f-b827-a5f7-c89eec4731ab",
            "from": "8c9c8651-e6f3-c0a3-5a90-fbe1ceaa99bb",
            "to": "3c713399-eed3-2e47-cc7d-cff89e6bc3c4",
            "sp": "top",
            "ep": "top",
            "name": "退回",
            "color": "2",
            "type": "tb",
            "M": 157.5,
            "strategy": "2",
            "agreeList": "disagree",
            "operationType": "sql",
            "strSql": "",
            "strSqlR": ""
          }]
        }
      });
    console.log("flowChart", flowChart);
  }, []);


  return (
    <div className="flow-chart">
      <div id="workflow"></div>
    </div>
  );
};

export default FlowChart;
