import logging
import os

# Get the absolute path to the logs directory relative to this file
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'logs')

# Ensure the logs directory exists
os.makedirs(LOG_DIR, exist_ok=True)

# Configure logging settings
def setup_logging():
    # Create a logger
    logger = logging.getLogger("companygpt")
    logger.setLevel(logging.INFO)

    # Create handlers for logging to both console and file
    console_handler = logging.StreamHandler()
    file_handler = logging.FileHandler(os.path.join(LOG_DIR, "app.log"))

    # Set the log level for the handlers
    console_handler.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)

    # Create a logging format
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    # Add the formatters to the handlers
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    # Add handlers to the logger
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger

# Initialize the logger globally
logger = setup_logging()
