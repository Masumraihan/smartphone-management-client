# Product Management

This is a product management dashboard using React, Typescript, Redux toolkit, and Tailwind CSS.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Functionality](#functionality)
   - [Smartphone Management](#smartphone-management)
   - [Sales Management](#sales-management)
   - [Sales History](#sales-history)
4. [User Interface Features](#user-interface-features)
5. [State Management](#state-management)
6. [Additional Features](#additional-features)
7. [Setup Instructions](#setup-instructions)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [Server Code](#server-code)

## Introduction

This project aims to provide a comprehensive solution for managing smartphone inventory and sales. It offers a user-friendly interface and robust functionality for efficient management.

## Authentication

User authentication is implemented using JSON Web Tokens (JWT) for secure authentication. Users can register, login, and access the system securely.

## Functionality

### Smartphone Management

- **CRUD Operations:** Managers can add, delete, and update smartphones in the inventory.
- **View Inventory:** Both managers and sellers can view the list of smartphones in the inventory.
- **Robust Filtering:** Effective filtering options are provided to narrow down smartphone selections based on various criteria.

### Sales Management

- **Initiate Sale Process:** Sellers can search for products and initiate the sale process.
- **Sale Form:** Sellers can fill out a form with details such as quantity, buyer's name, and sale date.
- **Inventory Update:** Products are automatically removed from the inventory when the quantity reaches zero.

### Sales History

- **Categorized View:** Sales history is categorized by weekly, daily, monthly, and yearly periods.
- **Seller's Sales History:** Sellers can view their own sales history, including invoice download functionality.

## User Interface Features

- **Real-time Updates:** The UI provides real-time updates for changes in the inventory and sales.
- **Efficient CRUD Operations:** Utilization of RTK Query ensures efficient CRUD operations with optimized performance.
- **Data Re-fetching:** Re-fetching functionality is implemented to ensure data accuracy and consistency.

## State Management

- **Redux:** Redux is used for state management to maintain a consistent application state across components.

## Additional Features

- **Role-based Access Control:** Three roles are implemented - SuperAdmin, Manager, and Seller.
- **Role-specific Functionality:** Each role has access to specific functionalities, ensuring secure and controlled access.
- **Bulk Delete:** Managers can perform bulk delete operations for efficient inventory management.
- **Duplicate & Edit:** Users can duplicate and edit existing products to create variants based on their needs.
- **New Roles and Functionality:**
  - **SuperAdmin:** Can access all functionalities.
  - **Manager:** Can add and update products.
  - **Seller:** Can sell products, view sales history, and download invoices.
- **Invoice Download:** Sellers can download invoices for their sales transactions.

## Setup Instructions

Follow these steps to set up the project:

1. Clone the repository from GitHub.
2. Navigate to the project directory.
3. Install dependencies using `yarn`.
4. Set up environment variables as needed.
5. Start the server using `yarn dev`.

## Usage

Once the project is set up, follow these instructions to use the application:

[Provide usage instructions here]

## Contributing

Contributions to the project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

#### Demo Super Admin Email : superAdmin@gmail.com
#### Demo Super Admin Pass : 123456

#### Demo Manager Email : test@gmail.com
#### Demo manager Pass : 123456

#### Demo Seller Email : m@gmail.com
#### Demo Seller Pass : 123456

### [Project Overview Video](https://drive.google.com/file/d/1nUbvemq86N7Wdczt7YCQtpot0zAqv7St/view?usp=sharing)

### [Server Github](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-Masumraihan)

### [Live Site](https://client-weld-omega.vercel.app/)
