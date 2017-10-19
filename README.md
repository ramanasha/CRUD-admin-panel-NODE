# CRUD-admin-panel-NODE
Technologies used on this project:
- HTML5, CSS3, Javascript
- Bootstrap 4 alpha
- Pug
- Node.JS
- MongoDB with Mongoose ODM
-  Express.js
- Passport.js

## Site online
You can visit this site on [DogTraining](https://miriamrico.herokuapp.com/) *(spanish language)*

## Admin panel explanation
The client wanted a simple landing page for the business ***but with a real focus on the database administration*** to take appointments, clients, payments, etc ....

I use **mongoose ODM** because I needed some relationships between documents and some validations within them because the clients can have one or several pets.

The client can modify his profile, services, social network, etc... ***and instantly appears on the main page*** the latest changes.

Pug template was my choice because in that moment I didn't know React and by the way, Pug gave me a good speed renderization and organization around the pages on the website.

The Back-End ***is completely on Node.JS*** and use Express.js that put online the server, passport.js for authentication.

The layout was very simple to did with the alpha version of Bootstrap 4 combining it with my CSS3 stylesheets.

It has both version, ***web and mobile*** so the client can do operations with the database on the smartphone too.

I had a lot of fun programming the search bar ***that allows find clients quickly*** by city, province, name, email, postal code, etc... I plan to improve it in the future :)

The admin dashboard have a message notification where the client can see the new messages sent by customers.

- - -
## Some images showing the admin panel:

### Home dashboard

![main_dashboard_web](https://image.ibb.co/nJmTgR/home_admin_panel.png)
![main_dashboard_mobile](https://image.ibb.co/cCXeo6/home_admin_panel_mobile.png)

### Message zone
![message_zone](https://image.ibb.co/cQ7C86/message_zone.png)
