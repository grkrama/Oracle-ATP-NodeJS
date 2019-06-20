# Introduction

Connecting Oracle ATP Database with Node JS.


# Technology Used

* Oracle Cloud
    - ATP
* NodeJs
* Postman

# Links

* [Oracle Cloud](http://cloud.oracle.com)
* [ATP Self Guided Workshop](https://oracle.github.io/learning-library/workshops/autonomous-transaction-processing/?page=README.md)
* [node-oracledb](https://oracle.github.io/node-oracledb/doc/api.html)
* [ATPnodeapp](https://github.com/kbhanush/ATPnodeapp)

# Steps

* Create ATP Database
* Download Wallet from ATP Database.
    - Wallet will have sqlnet.ora & TNS Entry, which will be used for connectivity
* Download [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html)
* npm install oracledb in same folder where node code will be written.


# Files

1 - server.js

Example to show how to retrieve data from ATP database.

2 - server-OrderNumGeneration.js

Example to show how to invoke sql procedure from nodejs code.

# Execution Block

* Create you ATP Instance & save your credentails.
* Enter the same credentails in the js file code.
* change the select statement according to your table instance.
* use postman to trigger the rest to that server.

# SQL Procedure

Creata sequence in dual and use that sequence name in procedure. [example](http://www.java2s.com/Code/Oracle/Sequence/Usedualtabletochecksequence.htm)