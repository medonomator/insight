#!/bin/bash
sed -i -e 's/href=\/css/href=\/static\/vue\/css/g' -e 's/href=\/js/href=\/static\/vue\/js/g' -e 's/src=\/js/src=\/static\/vue\/js/g' dist/index.html