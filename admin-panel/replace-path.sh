#!/bin/bash
sed -i -e 's/href="\/static\/css/href="\.\/static\/build\/static\/css/g' -e 's/src="\/static\/js/src="\.\/static\/build\/static\/js/g' build/index.html