# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)



### Database Schema

#### Table: users
| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary Key |
| firstName | VARCHAR(100) | User's first name |
| lastName | VARCHAR(100) | User's last name |
| password_digest | VARCHAR | Hashed password |

#### Table: products
| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary Key |
| name | VARCHAR(255) | Product name |
| price | INTEGER | Product price |
| category | VARCHAR(100) | Optional category |

#### Table: orders
| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary Key |
| user_id | INTEGER | Foreign Key to users.id |
| status | VARCHAR(20) | 'active' or 'complete' |

#### Table: order_products
| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary Key |
| order_id | INTEGER | Foreign Key to orders.id |
| product_id | INTEGER | Foreign Key to products.id |
| quantity | INTEGER | Quantity of products |
