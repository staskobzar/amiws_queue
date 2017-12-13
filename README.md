# amiws_queue
[![Build Status](https://travis-ci.org/staskobzar/amiws_queue.svg?branch=master)](https://travis-ci.org/staskobzar/amiws_queue)
[![codecov](https://codecov.io/gh/staskobzar/amiws_queue/branch/master/graph/badge.svg)](https://codecov.io/gh/staskobzar/amiws_queue)
![GPL](https://img.shields.io/badge/license-GPL_3-green.svg "License")

> Asterisk Queues Realtime Manager

Web dashboard for Asterisk Queues. It is using another project, [amiws](https://github.com/staskobzar/amiws), as a Back-End for AMI traffic to web-socket conbvertion.
![amiws_queue screenshot](https://github.com/staskobzar/amiws_queue/blob/master/screenshot.png)

## Build Setup

Refere to [amiws](https://github.com/staskobzar/amiws) documentation on how to install and setup Back-End.

This project uses VuJS with webpack so it requires NodeJS. Setup and build is as following:
```bash
git clone https://github.com/staskobzar/amiws_queue.git
cd amiws_queue
npm install
WS_URL="'ws://10.20.30.01:8000'" npm run build
```

Use an IP of the server where amiws is running and port when defining shell variable ```WS_URL```.
Note, when defining WS_URL using double and single quotes : _"'ws://IPADDR:PORT'"_.

After successful build files are stored in "dist" folder. Simply copy files from "dist" folder to the server with "amiws" Back-End,
to the folder defined in parameter "web_root" of "amiws" config file.

