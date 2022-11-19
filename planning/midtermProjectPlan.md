# Midterm Project

## Table of Contents
* Links
* Project Description
* Saturday Scrum
  * User Stories
  * Features
  * MVP/MVD
* Notes


## Links
[Database ERD](https://drive.google.com/file/d/1GzuWrU59UL9d-xduMUfwgh8nh_hFXmqM/view?usp=sharing)
[Project Files Diagram](https://www.figma.com/file/cAAYUcOztKl7CTCsOTNu4M/WorkFlow?node-id=0%3A1&t=7CGCIDY5e2h2C0er-1)
[Application Features Flowchart](https://www.figma.com/file/WXMUdelsT9uIYjZVuviWKu/Application-Flow-Chart?node-id=0%3A1&t=i02rS2ru0BoSU0oY-1)
[Wireframe](link)

## Project Description

Option 10: Food Pick-up Ordering
A food ordering experience for a single restaurant. 

- Hungry clients of this fictitious restaurant can visit its website
- select one or more dishes and place an order for pick-up.
    - They will receive a notification when their order is ready.
    - The restaurant and client both need to be notified since this app serves as an intermediary.
    - When an order is placed the restaurant receives the order via SMS.
        - The restaurant can then specify how long it will take to fulfil it.
            - Once they provide this information, the website updates for the client and also notifies them via SMS.
                - You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

## Saturday Scrum

### User Stories

RESTAURANT

- MENU
    - As ****************************the restaurant**************************** I want **********to *ADD* my menu offerings to the app** because I ****************want to sell them to customers (make money)****************
    - As ****************************the restaurant**************************** I want **********to update (*EDIT)* my menu offerings to the app** because I ****************want to keep my menu up to date (save time)****************
    - As ****************************the restaurant**************************** I want **********the menu offerings to automatically keep stock (EDIT)**********  because ****************I don’t want to manually update things (make money/save time)****************
    - As ****************************the restaurant**************************** I want **********the menu offerings to automatically remove (DELETE) out of stock things**********  because ****************I don’t want to manually update things (make money/save time)****************
- ORDERS
    - As ****************************the restaurant**************************** I want **************to update the app (EDIT) with the ready time************** because  ****************I want to the customer to not cancel the order (make money)****************
    - As ****************************the restaurant**************************** I want **************to update the website (EDIT) when the product is ready************** because  ****************I want to the customer to not cancel the order (make money)****************
- NOTIFICATIONS
    - As ****************************the restaurant**************************** I want **************to be notified (ADD/READ) when someone buys something************** because ****************because I want to get the product ready to deliver (save time)****************
    - As ****************************the restaurant**************************** I want **************to notify the customer (ADD) when the product is ready************** because  ****************I want the customer to not cancel the order (make money)****************
- STRETCH
    - As ****************************the restaurant**************************** I want **************to be notified (ADD/READ) when someone receives what they ordered************** because ****************I want to know when a sale has succeeded (save time)****************
    - As ****************************the restaurant**************************** I want to ********send a prompt for a review (ADD) if the customer hasn’t already reviewed us******** because ********************************************************************I want to increase my customer base (make money)********************************************************************
    - As ****************************the restaurant**************************** I want to ********send a prompt for a promotion/coupon (ADD)********  because ********************************************************************I want to increase my customer base (make money)********************************************************************

CUSTOMER

- MENU
    - As ****************************the customer**************************** I want **********to see (BROWSE) the menu offerings of the restaurants********** because I ****************want to see if there are discounted products I want (save money/save time)****************
    - As ****************************the customer**************************** I want **********to see (READ) an item of the restaurants********** because I ****************want to see the product description and know the product’s details (save time)****************
    - As ************************the customer************************ I want **********************************************************************the menu and UI (BROWSE) to be as intuitive as possible********************************************************************** because ******************************************************************I don’t want to have to learn how to use an app to order food (save time)******************************************************************
    - Stretch
        - Tags or Filters for the menu
            - As the customer I want to see (READ) items that have or are exclusive of the tags that I specify because I want to not spend time looking through things that are not a part of what I want (save time)
- ORDER
    - As ****************************the customer**************************** I want **********to order (ADD) an item of the restaurants********** because ****************I want to buy products I want at discounted prices (save money)****************
    - BASKET
        - As ****************************the customer**************************** I want **********to add (ADD) an item I want to a list of things I want********** because ****************I don’t want to make multiple transactions if I want to buy multiple things (save time/save money)****************
        - As ****************************the customer**************************** I want **********to see (READ) the items in my basket********** because ****************I want to know what I’m ordering (save time)****************
        - As ****************************the customer**************************** I want **********to remove (DELETE) items in my basket********** because ****************I want only order the things I want if I change my mind (save money)****************
        - As ****************************the customer**************************** I want **********to order (ADD) the items of the restaurants********** because **I** ****************want to buy all the products I want all at once and receive them in one order (save time/save money)****************
- NOTIFICATION
    - As ****************************the customer**************************** I want **********to be notified when the order has been received/confirmed by the restaurant********** because **I** ****************know if something went wrong with the order and I’m waiting for nothing (save time)****************
    - As ****************************the customer**************************** I want **********to be notified when the order has ready********** because **I** ****************know if when I will get my product or if something has gone wrong and I’m waiting for nothing (save time)****************

### Features

- Restaurant
    - Menu
        - Add item
        - Remove item
        - Stock tracker
        - Auto remove out of stock items
        - Edit item (quantity, description, etc)
    - Orders
        - Update order status
            - Received
            - Preparing/ready-time
            - Ready
    - Notifications
        - Receive order placed notification
        - Send order status notification
- Customer
    - Menu
        - See menu by type (?)
        - Item
            - Picture (?)
            - Description
            - Add to basket
    - Orders
        - Basket
            - Add item
            - Remove item
            - Edit quantity
            - Order basket
    - Notification
        - Receive order confirmed/received notification
        - Receive order confirmed notification

### MVP/MVD

The minimum viable product should be able to demonstrate features from the restaurant and the customer sides.

Hybrid Single-Multipage App

- Multi Page
    - Full page menu (M)
    - Order completion (M)
    - Restaurant
        - Header
            - Navigation
            - Badge (restaurant view/customer view)
        - Order Page (M)
            - List of orders (S)
                - States: Initial (received) ⇒ Processing ⇒ Ready
                    - Buttons: to send notifications (time, ready, delay, etc.)
                        - Twilio
                    - Cancel button(?)
                - Stretch
                    - Automatic processing of ready-time
                    - Message the customer function (if there is a problem e.g. out of stock, etc.)
                    - Everything else automated to send notifications for time, etc.
                        - Preset the est. time for prep/delivery/location to auto calculate the time for prep/delivery
                    - Stats bar
        - Menu Page (M)
            - Menu List
                - Same as customer list w/ added buttons for add, edit, delete
            - Form Button
                - Menu ADD (S)
                    - Dynamic pull up form
                    - Input fields
                        - Image, title, description, price, type, (stock)
                - Menu EDIT (S)
                    - Dynamic pull up form pre-populated
                - Menu DELETE (S)
                    - Delete button
    - Customer
        - Header
        - Menu (M)
            - Sidebar (S)
                - Buttons for different categories
            - Menu card (S)
                - Many cards
                    - Title, picture, description, price
                    - button: quantity, add to cart
            - Dynamic basket (S)
                - mini-menu cards
                    - tiny thumbnail (?)
                - subtotal
                - Button: checkout ⇒ redirect to Order
                - Top right placement(?)
                    - Dynamic: Window of info
                    - 
        - Order (M)
            - Menu/order item cards (S)
                - Edit quantity, remove buttons
                - centre aligned
                - larger version of dynamic basket
            - Subtotal/total
            - Button: place order
                - Sends text
                - Render Confirmation page
        - Order confirmation page (M/S)
            - items
            - Order status message
            - Misc details
                - address, time, thank you message

Restaurant should be able to add items to the menu, remove or update the items.

Restaurant should receive a notification when an order is placed by customer.

Restaurant should be able to change the status of an order from received, ready-time, to ready

Customer should be able to add, remove, and edit quantity of items from basket.

Customer should be able to place an order from the basket.

Customer should receive order status notifications.

- Stretch
    - Customer should be able to see menu items and toggle description or see a more detailed card.

## Notes

## User Stories

- How a user will interact with the app
    - As a () I can/want () because ()
- Take each project requirement and turn it into a user story
    - 4 User Needs - Vectors of Utility
        - Make money, save money, look good, save time
- User Stories become E2E tests
- Create a planning directory

```jsx
planning/user_stories.md
```

## Nouns

- Nouns turn into resources
- Resources ⇒ tables
- Tables ⇒ ERD

```jsx
planning/erd.png
```

## Routes

- How people (users, admin, etc) can access data
- http routes
- REST
    - Naming convention for routes
    - resources are plural
    - actions are singular
    
    ```jsx
    Browse GET     /category
    Read   GET     /category/:id
    Edit   PUT     /category/:id
    Add    POST    /category
    Delete DELETE  /category/:id/delete
    USERS
    Browse GET     /users
    Read   GET     /category/:id
    Edit   PUT     /category/:id
    Add    POST    /category
    Delete DELETE  /category/:id/delete
    ```
    
    ```jsx
    Browse GET     /category
    Read   GET     /category/:id
    Edit   PUT     /category/:id
    Add    POST    /category
    Delete DELETE  /category/:id/delete
    
    USERS
    Browse GET     /users
    Read   GET     /users/:id
    Edit   PUT     /users/:id
    Add    POST    /users
    Delete DELETE  /users/:id/delete
    
    ORDERS
    Browse GET     /orders
    Read   GET     /orders/:id
    Edit   PUT     /orders/:id
    Add    POST    /orders
    Delete DELETE  /orders/:id/delete
    ```
    

## MVP v. MVD

- Minimum Viable Product
    - The bare bones of functionality
- Minimum Viable Demo
    - What are the minimum set of features we can demo in 5 mins

## Login

- Don’t do login (?)
    - Maybe possible to just hack the one from tinyApp?
    - Alternative

```jsx
// do this instead
app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});
```

## Wireframes

- Draw out structure of webpages
- Minimal

```jsx
planning/home_page.png
```
