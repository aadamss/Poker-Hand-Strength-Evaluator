## Poker Hand Strength Evaluator

### Functionality

Solution was written in `JavaScript` using `node.js`.\
`Readline` was imported in order to read data from a readable stream one line at a time.\
Program was written using a `Functional Programming` approach.\
All `three` game types are supported.\
`Error checks` have been added.

### Building and running

Make sure that you are in the correct foler level to reach the `.sh` files.\
To install the needed prequesites run the `./prepare.sh` shell script.\
To run the program with a given `txt` file run the `./run.sh` shell script with an input file:\
`./run.sh < test-cases.txt > solutions.txt` - this will run the script taking an input file provided by you and\
will generate an output text file with the name of your choice with the solutions.\
`NOTE:` the input `txt` file should be in the same folder level as the script and\
the output `txt` file will also be generated in the same level.

### Limitations

No tests are written for the application, all testing was done manually.\
Application could have been written in a much more elegant fashion.\
Code could be cleaner.\
Everything is written in one file, but could have been split.\
Probably this was done more complex than it should have been.\
Overall `app.js` file looks difficult to read.\
Also would have been more optimal from my side to use `TypeScript` instead of vanilla `JavaScript`.
