#!/usr/bin/env bash

docker image build -t appointment_timetable .
docker image tag appointment_timetable soberservicesguy/portfolio-images:appointment_timetable_6
docker image push soberservicesguy/portfolio-images:appointment_timetable_6
