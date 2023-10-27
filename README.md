# FS Interface

A TypeScript-based interface for file storage optimization using content hashing.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

## Description

The "FS Interface" is a TypeScript class designed to optimize file storage by using content hashing. It provides methods to store and retrieve content using the hash of that content as the filename, saving space when multiple files have the same content.

## Features

- Store content using content hashing.
- Retrieve content based on filename.
- Optimizes storage space by avoiding duplicate content.

## Tech Stack

- Node.js (latest version)
- TypeScript (latest version)

## Installation

To use the FS Interface in your project, follow these steps:

1. Clone this repository or install it using npm or yarn:

   ```bash
   git clone https://github.com/yourusername/fs-interface.git
    ```
2. Install Node.js Dependencies:
    ```bash
    npm install
    ```

## Usage
You can use the FS class to interact with the file system. Here's a basic example of how to use it:

```typescript
import FS from 'fs-interface';

// Initialize the FS instance with a directory path.
const fileSystem = new FS('/topdir');

// Store content
fileSystem.store('filename1', 'a very long string1');

// Retrieve content
const result = await fileSystem.get('filename1');
console.log(result); // Output: 'a very long string1'
```
