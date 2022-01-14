const { question } = require('readline-sync');
const fs = require('fs');

async function run() {
    let exit = false;
    while (!exit) {
        // declaring the file
        let fileName = 'dictionary.json';
        let dictionary = {};
        // Read from command line
        const input = question('>');
        // Splitting the input to read the values
        let command = input.split(' ');
        let action = command[0];
        let input_key = command[1];
        let input_value = command[2];

        // Create a file if not exist
        if (!fs.existsSync(fileName)) {
            fs.writeFileSync(fileName, JSON.stringify(dictionary));
        }

        // Read from the file
        dictionary = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
        // Parsing the data to JSON format
        dictionary = JSON.parse(dictionary);
        // All the keys from dictionary
        let dictionary_keys = Object.keys(dictionary);
        // All the values from dictionary
        let dictionary_values = Object.values(dictionary);

        // Available Options
        let available_options = ['KEYS', 'MEMBERS', 'ADD', 'REMOVE', 'REMOVEALL', 'CLEAR', 'KEYEXISTS', 'MEMBEREXISTS', 'ALLMEMBERS', 'ITEMS', 'HELP'];
        
        //Help
        let help = {
            'App Name': 'Multi-Value Dictionary App',
            'Note': 'Commands are case sensitive',
            'KEYS': 'Returns all the keys in the dictionary. Example: KEYS',
            'MEMBERS': 'Returns the collection of strings for the given key. Example: MEMBERS foo',
            'ADD': 'Adds a member to a collection for a given key. Example: ADD foo bar',
            'REMOVE': 'Removes a member from a key. Example: REMOVE foo bar',
            'REMOVEALL': 'Removes all members for a key and removes the key from the dictionary. Example: REMOVEALL foo',
            'CLEAR': 'Removes all keys and all members from the dictionary. Example: CLEAR',
            'KEYEXISTS': 'Returns whether a key exists or not. Example: KEYEXISTS foo',
            'MEMBEREXISTS': 'Returns whether a member exists within a key. Example: MEMBEREXISTS foo bar',
            'ALLMEMBERS': 'Returns all the members in the dictionary. Example: ALLMEMBERS',
            'ITEMS': 'Returns all keys in the dictionary and all of their members. Example: ITEMS',
            'EXIT': 'To exit from application. EXAMPLE: EXIT'
        }

        switch (action) {
            // Adding a Key
            case 'ADD':
                if (dictionary_keys.includes(input_key)) { // Checking key already exists
                    if (dictionary[input_key].includes(input_value)) { // checking if member already exists 
                        console.log(') ERROR, member already exists for key'); 
                    } else { // Adding member to the key
                        dictionary[input_key].push(input_value); 
                        console.log("Added");
                    }
                } else { // if key not present adding key and value
                    dictionary[input_key] = [input_value];
                    console.log("Added");
                }
                break;
            // listing all the keys
            case 'KEYS':
                if (dictionary_keys.length) {
                    // Iterating through all the available keys
                    dictionary_keys.map((key, index) => {
                        console.log(`${index + 1}) ${key}`);
                    })
                } else {
                    console.log('(empty set)');
                }
                break;
            // listing all the values of a key
            case 'MEMBERS':
                if (dictionary_keys.includes(input_key)) { // checking if key exists
                    // Iterating through all the available values
                    dictionary[input_key].map((value, index) => {
                        console.log(`${index + 1}) ${value}`);
                    })
                } else {
                    console.log(') ERROR, key does not exist.');
                }
                break;
            case 'REMOVE':
                if (dictionary[input_key]) { // checking if exists
                    if (dictionary[input_key].includes(input_value)) { // checking member exists for that key
                        let index = dictionary[input_key].indexOf(input_value); // Getting the index of the member
                        dictionary[input_key].splice(index, 1); // removing it using index
                        if (!dictionary[input_key].length) { // checking if key has no memebers
                            delete dictionary[input_key]; // deleting the key
                        }
                        console.log('Removed');
                    } else {
                        console.log(') ERROR, member does not exist');
                    }
                } else {
                    console.log(') ERROR, key does not exist.');
                }
                break;
            case 'REMOVEALL':
                if (dictionary[input_key]) {
                    delete dictionary[input_key];
                    console.log('Removed');
                } else {
                    console.log(') ERROR, key does not exist.');
                }
                break;
            case 'CLEAR':
                dictionary = {};
                console.log(') Cleared');
                break;
            case 'KEYEXISTS':
                if (dictionary_keys.length && dictionary_keys.includes(input_key)) {
                    console.log('true');
                } else {
                    console.log('false');
                }
                break;
            case 'MEMBEREXISTS':
                if (dictionary_keys.includes(input_key) && dictionary[input_key].includes(input_value)) {
                    console.log('true');
                } else {
                    console.log('false');
                }
                break;
            case 'ALLMEMBERS':
                if (dictionary_values.length) {
                    let count = 1;
                    dictionary_values.map((value) => {
                        if (value.length) {
                            value.map(val => {
                                console.log(`${count++}) ${val}`);
                            })
                        }
                    })
                } else {
                    console.log('(empty set)');
                }
                break;
            case 'ITEMS':
                if (dictionary_keys.length) {
                    let count = 1;
                    dictionary_keys.map(key => {
                        dictionary[key].map(val => {
                            console.log(`${count++}) ${key}: ${val}`)
                        })
                    })
                } else {
                    console.log('(empty set)');
                }
                break;
            case 'HELP':
                console.log(help);
                break;
            case 'EXIT':
                console.log(`See you soon!`);
                exit = true;
                break;
            default:
                console.log(`Invalid input. \nAvailable commands are: ${available_options}`);
        }
        // writing data to file
        fs.writeFileSync(fileName, JSON.stringify(dictionary));
    }
}

run();