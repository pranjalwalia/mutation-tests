### Overview

The project is a library that exposes APIs for interacting with implementations of common data structures in JavaScript as it does not have a native template library.

### Directory Structure

After unzipping the submission file, the folder titled code contains all the relevant source code accompanied with the corresponding unit tests for the same, following directories lie within code:

1. The folder titled as **src** houses all the implementations, and the name of each file corresponds to the data structure it implements.

2. The folder titled as **test** houses all tests for the corresponding implementations and the name of each file corresponds to the tests for that data structure.

3. The folder titled as **coverage/lcov-report** houses the code coverage report of the unit tests within the file index.html

4. The folder titles as **reports/mutation** houses a file mutation.html that contains the source code mutation analysis report.

### Running Instructions 

- Run unit tests: `yarn test`
- Run mutation tests -- this automatically generates the mutation testing report: `yarn test:mutation`,  
- Generate Unit Test Coverage: `yarn coverage`