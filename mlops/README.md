# Machine Learning Operations
Directory used to store files related to model weights, inference tests, training data and related functions.

## Setup
1. Download Anaconda : `https://docs.anaconda.com/anaconda/install/`
2. Create a new conda environment in the terminal: `conda create -n <name_of_env>`
3. Use `model_test.py` from `mlops` directory: `python3 tests/model_test.py`
    - Person in water: specify `water_test` path in the test inference section of `model_test.py`
    - Person in woods: Specify `woods_test` path in the test inference section of `model_test.py`
    - Multiple persons: Specify `multi_person` path in the test inference section of `model_test.py`
