const Fixture = {}

// ========================================
Fixture.oneQueue = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "5","Holdtime": "0","TalkTime": "0","Completed": "231","Abandoned": "120","ServiceLevel": "3.43","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "1","Channel": "SIP/router01-0013ab9e","Uniqueid": "1509489741.3343730","CallerIDNum": "14383918247","CallerIDName": "14383918247","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "549"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "2","Channel": "SIP/router01-0013ac19","Uniqueid": "1509489893.3344025","CallerIDNum": "14383958755","CallerIDName": "14383958755","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "396"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "3","Channel": "SIP/router01-0013ac94","Uniqueid": "1509490108.3344364","CallerIDNum": "14384914339","CallerIDName": "14384914339","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "182"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueEntry","Queue": "TechSupport","Position": "4","Channel": "SIP/router01-0013acae","Uniqueid": "1509490200.3344434","CallerIDNum": "14383964496","CallerIDName": "14383964496","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Wait": "90"}}`
]

Fixture.callerHangup = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "Hangup","Privilege": "call,all","Channel": "SIP/router01-0013acae","Uniqueid": "1509490200.3344434","CallerIDNum": "1000","CallerIDName": "Eric Gingras","ConnectedLineNum": "<unknown>","ConnectedLineName": "<unknown>","AccountCode": "","Cause": "0","Cause-txt": "Unknown"}}`
Fixture.callerAbandoned = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueCallerAbandon","Privilege": "agent,all","Queue": "TechSupport","Uniqueid": "1509490200.3344434","Position": "1","OriginalPosition": "1","HoldTime": "54"}}`
// ========================================

// ========================================
Fixture.newCallersJoins = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "5","Holdtime": "0","TalkTime": "0","Completed": "231","Abandoned": "120","ServiceLevel": "3.43","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "Join","Privilege": "call,all","Channel": "SIP/router01-00000039","CallerIDNum": "1000","CallerIDName": "Eric Gin","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Queue": "TechSupport","Position": "1","Count": "1","Uniqueid": "1510084369.69"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "Join","Privilege": "call,all","Channel": "SIP/router01-0000003a","CallerIDNum": "1000","CallerIDName": "John Bar","ConnectedLineNum": "unknown","ConnectedLineName": "unknown","Queue": "TechSupport","Position": "2","Count": "2","Uniqueid": "1510084379.43"}}`
]

Fixture.callerLeaves = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "Leave","Privilege": "call,all","Channel": "SIP/router01-0000003a","Queue": "TechSupport","Count": "1","Position": "2","Uniqueid": "1510084379.43"}}`
// ========================================

// ========================================
Fixture.oneQueueWithThreeMembers = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "5","Holdtime": "0","TalkTime": "0","Completed": "231","Abandoned": "120","ServiceLevel": "3.43","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1004@sc360.modulis.clusterpbx.ca","Location": "Local/1004@from-queue/n","StateInterface": "Local/1004@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "1","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1005@sc360.modulis.clusterpbx.ca","Location": "Local/1005@from-queue/n","StateInterface": "Local/1005@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "0","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1006@sc360.modulis.clusterpbx.ca","Location": "Local/1006@from-queue/n","StateInterface": "Local/1006@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "0","PausedReason": ""}}`
]

Fixture.addMember = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMemberAdded","Privilege": "agent,all","MemberName": "5555@sc360.modulis.clusterpbx.ca","Interface": "Local/1800@from-queue/n","Membership": "dynamic","Queue": "TechSupport","StateInterface": "Local/1800@from-queue/n","Penalty": "0","CallsTaken": "0","InCall": "0","LastCall": "0","Status": "4","Ringinuse": "1","Paused": "0","PausedReason": ""}}`
Fixture.removeMember = `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMemberRemoved","Privilege": "agent,all","MemberName": "1006@sc360.modulis.clusterpbx.ca","Interface": "Local/1006@from-queue/n","Membership": "dynamic","Queue": "TechSupport","StateInterface": "Local/1006@from-queue/n","Penalty": "0","CallsTaken": "0","InCall": "0","LastCall": "0","Status": "4","Ringinuse": "1","Paused": "0","PausedReason": ""}}`
// ========================================

Fixture.oneQueueWithThreeMembersUpdate = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "5","Holdtime": "0","TalkTime": "0","Completed": "231","Abandoned": "120","ServiceLevel": "3.43","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1004@sc360.modulis.clusterpbx.ca","Location": "Local/1004@from-queue/n","StateInterface": "Local/1004@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "1","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1005@sc360.modulis.clusterpbx.ca","Location": "Local/1005@from-queue/n","StateInterface": "Local/1005@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "0","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1006@sc360.modulis.clusterpbx.ca","Location": "Local/1006@from-queue/n","StateInterface": "Local/1006@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "0","PausedReason": ""}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueMember","Queue": "TechSupport","Name": "1006@sc360.modulis.clusterpbx.ca","Location": "Local/1006@from-queue/n","StateInterface": "Local/1006@from-queue/n","Membership": "static","Penalty": "0","CallsTaken": "0","LastCall": "0","InCall": "0","Status": "4","Paused": "1","PausedReason": ""}}`
]

export default Fixture
