const Fixture = {}

Fixture.oneEmptyQueue = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "0","Holdtime": "10","TalkTime": "100","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`
]

Fixture.queueSummaryResp = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueSummary","Queue": "TechSupport","LoggedIn": "1","Available": "1","Callers": "0","HoldTime": "345","TalkTime": "987","LongestHoldTime": "0"}}`

Fixture.twoEmptyQueues = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "SalesDep","Max": "8","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`
]

Fixture.twoQueuesAndUpdateQueue = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "SalesDep","Max": "8","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`
]

Fixture.oneQueueWithTwoMembersThreeCallers = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "5","Holdtime": "0","TalkTime": "0","Completed": "231","Abandoned": "120","ServiceLevel": "3.43","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "1","Channel": "SIP/router01-0013ab9e","Uniqueid": "1509489741.3343730","CallerIDNum": "14383918247","CallerIDName": "14383918247","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "549"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "2","Channel": "SIP/router01-0013ac19","Uniqueid": "1509489893.3344025","CallerIDNum": "14383958755","CallerIDName": "14383958755","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "396"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "3","Channel": "SIP/router01-0013ac94","Uniqueid": "1509490108.3344364","CallerIDNum": "14384914339","CallerIDName": "14384914339","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "182"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1004@sc360.modulis.clusterpbx.ca","Location": "Local/1004@from-queue/n","StateInterface": "Local/1004@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "1","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1005@sc360.modulis.clusterpbx.ca","Location": "Local/1005@from-queue/n","StateInterface": "Local/1005@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "0","PausedReason": ""}}`
]

Fixture.joinCaller = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "Join","Privilege": "call,all","Channel": "SIP/router01-00000050","CallerIDNum": "1000","CallerIDName": "Eric Gingras","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Queue": "TechSupport","Position": "4","Count": "3","Uniqueid": "1510322646.118"}}`

Fixture.unpauseMemeber = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMemberPause","Privilege": "agent,all","MemberName": "1005@sc360.modulis.clusterpbx.ca","Interface": "Local/1005@from-queue/n","Membership": "static","Queue": "TechSupport","StateInterface": "Local/1005@from-queue/n","Penalty": "0","CallsTaken": "4","InCall": "0","LastCall": "1510365542","Status": "1","Ringinuse": "1","Paused": "1","PausedReason": ""}}`

export default Fixture
