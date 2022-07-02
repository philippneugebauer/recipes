#!/bin/bash
set -e
set -o pipefail

rails assets:precompile
rails server -b 0.0.0.0
