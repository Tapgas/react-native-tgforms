#!/bin/bash

function edit {
 sed -i -e 's/buildToolsVersion "23.0.1"/buildToolsVersion "25.0.0"/g' $(pwd)/node_modules/$1/android/build.gradle
 sed -i -e "s/buildToolsVersion '23.0.1'/buildToolsVersion '25.0.0'/g" $(pwd)/node_modules/$1/android/build.gradle
 sed -i -e 's/buildToolsVersion "23.0.3"/buildToolsVersion "25.0.0"/g' $(pwd)/node_modules/$1/android/build.gradle
 echo "- Se cambio el valor de la propiedad buildToolsVersion de 23.0.1 a 25.0.0 modulo $1"
}

edit react-native-vector-icons
