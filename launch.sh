#!/bin/bash
counter=$1
while [ $counter -gt 0 ]
do
	casperjs --ignore-ssl-errors=yes --ssl-protocol=any telelangue.js
	let counter-=1
done