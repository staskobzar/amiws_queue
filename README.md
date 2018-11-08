# amiws_queue
[![Build Status](https://travis-ci.org/staskobzar/amiws_queue.svg?branch=master)](https://travis-ci.org/staskobzar/amiws_queue)
[![codecov](https://codecov.io/gh/staskobzar/amiws_queue/branch/master/graph/badge.svg)](https://codecov.io/gh/staskobzar/amiws_queue)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8333ddee50b14cccbc8f56828ccc816a)](https://www.codacy.com/app/staskobzar/amiws_queue?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=staskobzar/amiws_queue&amp;utm_campaign=Badge_Grade)
![GPL](https://img.shields.io/badge/license-GPL_3-green.svg "License")

> Asterisk Queues Realtime Manager

Web realtime dashboard for Asterisk Queues. It is using another project, [amiws](https://github.com/staskobzar/amiws), as a Back-End for AMI traffic to web-socket conversion. More [screenshots here](https://staskobzar.blogspot.ca/2017/12/asterisk-queues-realtime-dashboard-with.html).

![amiws_queue screenshot](https://github.com/staskobzar/amiws_queue/blob/master/screenshot.png)

## Build Setup

Refere to [amiws](https://github.com/staskobzar/amiws) documentation to learn how to install and setup Back-End.

This project uses VueJS with webpack and it requires NodeJS. Setup and build it as following:
```bash
git clone https://github.com/staskobzar/amiws_queue.git
cd amiws_queue
npm install
WS_URL="'ws://10.20.30.01:8000'" npm run build
```

Use an IP and port of the server where amiws is running when defining shell variable ```WS_URL```.
Note, when defining WS_URL usage of double and single quotes : _"'ws://IPADDR:PORT'"_.

After successful build files are stored in "dist" folder. Simply copy files from "dist" folder to the server with "amiws" Back-End,
to the folder defined in parameter "web_root" of "amiws" config file.

## Asterisk configuration

This dashboard was tested with Asterisk 11 and 13. Should work with other versions too (AMI v2 and before).
Asterisk queues additional events MUST be enabled per queue.

In configuration file (Asterisk version older 12):
```
eventmemberstatus = yes
eventwhencalled = yes
```

When using realtime with DB this values must equal "1": ``` eventmemberstatus = 1, eventwhencalled = 1 ```

