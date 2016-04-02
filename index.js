var express = require('express');
express().use(express.static('public'))
   .listen(process.env.PORT, process.env.IP);