#!/bin/bash
set -e

GREEN='\033[0;32m'
NC='\033[0m'

# grenache hash tables
x-terminal-emulator -e 'echo "grape-1" && grape --dp 20001 --aph 30001 --bn "127.0.0.1:20002"'
x-terminal-emulator -e 'echo "grape-2" && grape --dp 20002 --aph 40001 --bn "127.0.0.1:20001"'

echo -e "${GREEN}✓ local infrastructure started${NC}"
