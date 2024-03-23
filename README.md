
# Random JSON Array Generator

## Overview

This is a simple and customizable tool for generating random JSON arrays within specified ranges. It utilizes JavaScript and functional programming concepts to create structured data for testing, prototyping, or any other purpose requiring randomized data generation.

## Features

- Generates random JSON arrays with customizable ranges.
- Supports various data types including strings, numbers, dates, and predefined sets.
- Provides flexibility to define complex object structures.
- Easy to use and integrate into existing projects.

## Installation

You can install the generator via npm:

```bash 
npm install random-generator
``` 

## Usage

1.  Require or import the generator module into your JavaScript project:


```js
const R = require('random-generator'); // For Node.js
// or
import R from 'random-generator'; // For ES6 modules` 
```

2.  Customize the generator to fit your data requirements by modifying the provided template.
    
3.  Generate random JSON arrays using the `generate()` method of the generator object.
    
4.  Access the generated data for further processing within your application.
    

## Example

```js
const R = require('random-generator');

// Example of generating random data
const dataGenerator = R.Array(
    R.Object({
        // Generate a unique identifier for each object
        id: R.Guid(),

        // Generate a random string for the name
        name: "Item " + R.Between(1, 100),

        // Generate a random value for the price between 10 and 100
        price: R.Between(10, 100),

        // Generate a random value for the category
        category: R.AnyOf("Electronics", "Clothing", "Books"),

        // Generate a random value for the color
        color: R.AnyOf("Red", "Blue", "Green"),

        // Generate a random quantity between 1 and 10
        quantity: R.Between(1, 10),

        // Generate a random date for the manufacture date within the last year
        manufactureDate: R.Date(
            new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Start date (1 year ago)
            new Date(), // End date (today)
            "YYYY-MM-DD"
        ),

        // Generate a random expiration date within the next year
        expirationDate: R.Date(
            new Date(), // Start date (today)
            new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // End date (1 year from now)
            "YYYY-MM-DD"
        ),

        // Generate a random barcode based on the object's id
        barcode: R.SameAs(p => p.id).mappedInto(barcode => `BAR${barcode}`),

        // Generate a string representation of the price
        priceString: R.SameAs(p => p.price).asString()
    })
).withLengthBetween(2, 5); // Generate an array with 2 to 5 objects

const generatedData = dataGenerator.generate();

console.log(generatedData);
```
It gives output
```json
[
    {
        "id": "d0dc9c9c-9c04-42ff-bd79-418c2826bdf7",
        "name": "Item 57",
        "price": 82,
        "category": "Electronics",
        "color": "Red",
        "quantity": 5,
        "manufactureDate": "2023-06-12",
        "expirationDate": "2024-03-22",
        "barcode": "BARd0dc9c9c-9c04-42ff-bd79-418c2826bdf7",
        "priceString": "82"
    },
    {
        "id": "b61b682a-9bd5-493d-9c15-8f30bfbbcb67",
        "name": "Item 87",
        "price": 47,
        "category": "Books",
        "color": "Blue",
        "quantity": 2,
        "manufactureDate": "2023-09-28",
        "expirationDate": "2024-05-28",
        "barcode": "BARb61b682a-9bd5-493d-9c15-8f30bfbbcb67",
        "priceString": "47"
    },
    {
        "id": "4a5f0d9e-f9ed-487d-9c5d-6dbb89159024",
        "name": "Item 17",
        "price": 36,
        "category": "Clothing",
        "color": "Green",
        "quantity": 10,
        "manufactureDate": "2023-08-10",
        "expirationDate": "2024-02-09",
        "barcode": "BAR4a5f0d9e-f9ed-487d-9c5d-6dbb89159024",
        "priceString": "36"
    }
]

```

  
Certainly! In the provided code, `R.Array()` and `R.Object()` are helper functions provided by the `random-generator` library. They allow you to define arrays of objects (`R.Array()`) and nested object structures (`R.Object()`), respectively, for generating random data.

Here's an explanation of how they work and how they can be cascaded to create complex data structures:

### R.Array()

`R.Array()` is used to define an array of objects or values. It takes another generator function or a value as an argument. When a generator function is provided, it generates an array of values according to the defined generator function.

javascriptCopy code

`const arrayGenerator = R.Array(generatorFunction);` 

### R.Object()

`R.Object()` is used to define an object with nested properties. It takes a configuration object where each key represents a property name, and the value is either a generator function or a static value.

javascriptCopy code

`const objectGenerator = R.Object({
    property1: generatorFunction1,
    property2: generatorFunction2,
    // ...
});` 

### Cascading Example

You can cascade `R.Array()` and `R.Object()` to define complex data structures with nested arrays and objects. For example:

javascriptCopy code

```js
const complexDataGenerator = R.Array(
    R.Object({
        id: R.Guid(),
        name: "Category " + R.Between(1, 10),
        products: R.Array(
            R.Object({
                productId: R.Guid(),
                productName: "Product " + R.Between(1, 20),
                price: R.Between(10, 100)
            })
        ).withLengthBetween(1, 5)
    })
).withLengthBetween(2, 5);` 
```

In this example:

-   `complexDataGenerator` generates an array of objects, each representing a category.
-   Each category object has an `id`, a dynamically generated `name`, and an array of products.
-   The products array contains objects representing individual products with properties like `productId`, `productName`, and `price`.
-   The length of the products array is randomly generated between 1 and 5 for each category.
-   The length of the categories array is randomly generated between 2 and 5.


### Description

-   `R.Guid()`: Generates a random GUID.
-   `R.Between()`: Generates a random number within a specified range.
-   `R.AnyOf()`: Selects a random value from a provided set.
-   `R.SameAs()`: Generates a value based on the properties of the same object.
-   `mappedInto()`: Maps the selected value into another value based on a mapping object.
-   `asString()`: Converts the generated number into a string.
-   Nested objects and arrays of objects can be defined using `R.Object()` and `R.Array()` respectively.




## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Feedback and Contributions

Feedback and contributions are welcome! Feel free to open an issue or submit a pull request on GitHub.