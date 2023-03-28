# Geographic Specific Emergency Broadcast Over Mobile Carrier Networks

## Cell Broadcast
It is a method of sending messages to multiple mobile telephone users in a defined area at the same time.

It is also known as SMS-CB (Short Messaging Service-Cell Broadcast)
Unlike SMS-PP(Short Messaging -Peer-to-peer), CB is a one-to-many geo-targeted and geo-fenced messaging service.
CB messages are directed to base station radio cells rather than specific telephones. Current CB technology can send a message to 1M cells in less than 10s reaching all subscribers at the same time.

CB message is an unconfirmed push service that maintains recipient anonymity because individual mobile numbers are not required to perform a CB.

The success rate can be measured by comparing the list of addressed cells and the number of cells that have broadcast the CB msg.
Once a CB broadcast is initiated, it can be repeated indefinitely. Each CB msg recipient will have the same message identifier and the same serial number. Using this info, the mobile telephone is able to identify and ignore broadcasts of already received messages.

One CB message page is 82 octets that can hold 93 characters. 15 such pages can be sent hence a max length of a CB msg is 1395 characters.

A Cell Broadcast Centre (CBC) is a system with is the source of the SMS-CB connected to a Base Station Controller.

The base station contoller then forwards the message to the appropriate base station or stations in the designated cells or to all 


### SMS-CB as an emergency comms system
It isn't affected by traffic load, most suited for when disaster strikes. Social media and mobile apps tend to conject networks. 
