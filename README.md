# Billing Restaurant
An Open Source complete Production Grade Restaurant Billing App built with latest technologies like React, NextJS, GraphQL Yoga, Prisma, Apollo-Client.

### Getting Started

There complete setup instruction of this project can be found in the medium article [Complete Production Grade Restaurant Billing App built in React NextJS GraphQL](https://medium.com/@nabendu82/complete-production-grade-restaurant-billing-app-built-in-react-nextjs-graphql-d4efac352be6)

### About App
This is an advanced Production grade app, will all features to act as an Billing platform for any Restaurant or any other type of establishment. Currently, while checkout the order is saved in the database and can be also seen in the ORDERS page. My motive is to have this app serve as a basis of the more advanced Restaurant or general Point-Of-Sale app for anyone. Fell free to fork it, use it, raise issue(and fix them)

### Features
As with any POS software, there are mainly two category of user - ADMIN and Normal user. But in this app many different categories of users are available, who can be configured by ADMIN user or an user with PERMISSIONUPDATE status. 

#### ADMIN User
The ADMIN user have more priviledges then normal user. On login with ADMIN user, click on the hamburger menu to see all different pages which he/she can access.

![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562863987/AdminPages_uxktwg.png)

The different pages are -
+ **MENU** - The main page showing all dishes. Admin user can Edit or Delete an Item also.
+ **ORDERS** - It contains all the Orders taken by the user. It will open the below page.
![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562864499/OrdersPage_lheeoe.png)

+ **ADD DISH** - Available to the Admin user and the user with permission ITEMCREATE, to add a new Item
![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562864760/AddDish_betftr.png)

+ **PERMISSIONS** - Available to Admin user and the user with permission PERMISSIONUPDATE. From this page we can Update access of any user. These are the five type of ideal user you should create, but any combination is allowed.
![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562865435/Permissions_uls8ix.png)

+ **SIGNUP** - Available to Admin user and the user with permission PERMISSIONUPDATE. From this page you can create new users. Create an user with real gmail id to have the Password reset facility available.
![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562865746/Signup_p8ft3q.png)

#### Normal User
A Normal user have the below priviledges. It is recommended to create normal users for Billing purposes.
![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562865969/Normal_lh7m1k.png)

Now we will do billing throug a normal user. Although Admin and other user can also do Billing through homepage or MENU. There are two ways to add items to **Bill**. Click on an item or search in **Add to Bill Directly** and click on it. 

![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562866392/Search_sr2j86.png)

After adding some items by either way, click on hamburger menu and the **BILL**

![](https://res.cloudinary.com/dxkxvfo2o/image/upload/v1562866502/Bill_offgff.png)

Now, click on **CHECKOUT** button, to save the order in Prisma database and also shown in ORDERS page. You can also delete an item in BILL by clicking **X** beside the item. 

### Deploy in Heroku
Details on deployment in Heroku can be found in the medium article [Deploying React NextJS GraphQL App in Heroku](https://medium.com/@nabendu82/deploying-react-nextjs-graphql-app-in-heroku-52472805d75e)

------------


You can checkout the heroku deployed project [here](https://billingrestro-react-prod.herokuapp.com)
> Login credentials for Normal User: normal@gmail.com/normal

------------
