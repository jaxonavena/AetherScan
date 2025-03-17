# Machine Learning Operations
Directory used to store files related to model weights, inference tests, training data and related functions.

## Setup
1. Download Anaconda : `https://docs.anaconda.com/anaconda/install/`
2. Create a new conda environment in the terminal: `conda create -n <name_of_env>`
3. Use `model_test.py` from `mlops` directory: `python3 tests/model_test.py`
    - Person in water: specify `water_test` path in the test inference section of `model_test.py`
    - Person in woods: Specify `woods_test` path in the test inference section of `model_test.py`
    - Multiple persons: Specify `multi_person` path in the test inference section of `model_test.py`


## Setting Up the Model Server

# 1. Download required packages.
Run `pip install -r requirements.txt` from the `model_server` directory

# 2. Setup in OBS Studio
1. Install and open OBS Studio
2. Add a video source (tested on webcam, should be able to select a discord stream or whatever we need)
3. Configure OBS Studio Websocket Server (through 'Preferences')
4. Install Docker [https://docs.docker.com/engine/install/]
5. Configure `Dockerfile` & `config.yaml` (did not do this too lazy will do it after break)
6. Run the SMTP server (through Docker engine)
7. Run `model_server.py` :D