const Fixture = {}
Fixture.oneServer = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`
]

Fixture.threeServers = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 4, "server_id": 2, "server_name": "asterisk02.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-02","CoreStartupTime": "12:43:57","CoreReloadDate": "2017-11-03","CoreReloadTime": "19:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 4, "server_id": 3, "server_name": "asterisk03.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-12-02","CoreStartupTime": "12:43:57","CoreReloadDate": "2017-12-03","CoreReloadTime": "19:43:57","CoreCurrentCalls": "0"}}`
]

Fixture.oneSrvWithTwoQueues = [
  `{ "type": 4, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Response": "Success","CoreStartupDate": "2017-11-01","CoreStartupTime": "18:43:57","CoreReloadDate": "2017-11-01","CoreReloadTime": "18:43:57","CoreCurrentCalls": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "TechSupport","Max": "0","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`,
  `{ "type": 3, "server_id": 1, "server_name": "asterisk01.local", "ssl": false, "data": {"Event": "QueueParams","Queue": "SalesDep","Max": "8","Strategy": "ringall","Calls": "0","Holdtime": "0","TalkTime": "0","Completed": "0","Abandoned": "0","ServiceLevel": "0","ServicelevelPerf": "0.0","Weight": "0"}}`
]

export default Fixture
