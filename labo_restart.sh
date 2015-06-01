#!/bin/bash

b=$(tput bold)
n=$(tput sgr0)

echo "${b}# LABO HALT${n}"
./labo_halt.sh
echo

echo "${b}# LABO BUILD${n}"
./labo_build.sh
echo

echo "${b}# LABO RUN${n}"
./labo_run.sh
echo

echo "${b}# LABO RUN LB${n}"
./labo_run_lb.sh