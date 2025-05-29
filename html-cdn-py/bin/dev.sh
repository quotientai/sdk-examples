#!/bin/bash

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  -h, --help        Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Set environment variables
export HOST_NAME=http://localhost:3001
export LISTEN_ADDRESS=0.0.0.0
export LISTEN_PORT=3001
export DEV_MODE=True

# Start the main application
uv run src/__main__.py

# Exit the script
exit 0
