FAD Games

FAD-Games is an user interactive app that allows users to search, learn about games and their favorite game-designers. Users can review, edit, delete or even *purchase* their favorite games. Users have ability to create a profile-page and store private information once followed necessary authentication steps. *strech*
[Link to project hosted on Heroku]()

## Technologies Used

*What technologies did you use to develop this project? (bullet points)*

User Stories we are going to define a single Resource in this app called a Review so that we have something to CRUD:
Users have access to page Games, Users, New Games, New Users, New Reviews and Log in/Log out buttons on the splash page
Users can create profile page and be authenticated
Users can see link to games
Users can read and write reviews
Users can delete a review (destroy)
Users can edit a review (edit/update)
Users can rate games

## Existing Features

*What features does your app have? (bullet points)*




## Planned Features

*What changes would you make to your project if you continue to work on it? (bullet points)*

---

##### Screenshot(s) (optional)







# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Project 1 Planning

This document gives you a little more guidance about the Project 1 planning deliverables and how to approach them.

## Getting Ideas

Think about problems you know of - things that suck or are broken in the world. Could you build something that could grow into a solution? Try to create a focused app that does one thing well.

Examples of applications that do one thing well:

* <a href="https://maps-with-friends.herokuapp.com" target="_blank">Maps with Friends</a> - track friends by putting markers on a map
* Facebook Messenger - communication between individuals or groups
* <a href="http://www.questioncookie.com" target="_blank">Question Cookie</a> - fast voting moderation

Check out these [Project 1 examples from SEI-5](https://ezziagheith.github.io/gift-sei5/project1.html)!

## Project Planning Deliverables

### Scope

Software development is about managing complexity. It's easy for code to become a tangled web of tightly coupled functions or data structures (<a href="http://callbackhell.com" target="_blank">callback hell</a>, anyone?) if you aren't diligent and vigilant in your decision-making.

The same applies to the scope of your project. If you're always looking at the top of the mountain, you'll trip on the rocks in front of you.

![iterative-design](https://cloud.githubusercontent.com/assets/7833470/11330092/f76e7c50-9159-11e5-875f-748817e41afc.png)

Figure out the absolutely smallest thing you can do, and do that thing. Not the next immediate thing, but the simplest possible implementation of your app. If that means that the entire functionality of your app consists of displaying all of a user's photos from their Flickr account and saving a favorite photo url to the database that is totally great.


### User Stories

Outline your core user stories, and divide them into clear, smaller steps (sometimes called development "stories"). For example, this user story:

*As a user, I want to create a profile for my dog.*

Might consist of these steps:

* Wireframe what a profile page will look like.
* Create a template for a profile page
* Write a server route to serve the profile page
* Create a schema for a dog, defining attributes (e.g. name, age, favorite chew toy, etc.).
* Create a page / form / route to create a new user in the database.
* Serve the profile page and populate  it with information from the database.

Use your own <a href="https://trello.com" target="_blank">Trello</a> board to track your progress and keep you focused. Make each card a user story, and mark it with a time estimate. You can make the steps for that user story into a checklist on the card (or individual cards, if you prefer). For a more accurate estimate, double the time you think it will take.

Add comments to your cards as you progress and complete features. By the end of your project you'll have a living log of "gotchas" you debugged and things you learned about the process of iteratively developing an app.

### Wireframes

Sketch out the pages of your app. What will they look like? How they will work, both on page-load and when affected by jQuery?

Iterate on your wireframes. Start simple: draw some boxes. Add some text to the boxes to indicate what they represent, like the header, sidebar, images, titles, articles, and so on.

![wireframe](https://cloud.githubusercontent.com/assets/7833470/11330149/d84f3e94-915a-11e5-9b7d-31c41492dd6b.jpg)

Next, incorporate some notes on what the actual content will be. Remember, it's okay if it's still a sketch.  Either of the wireframes below would work well to solidify your plan.

![wireframe-progress](https://cloud.githubusercontent.com/assets/7833470/11330157/fbfaf388-915a-11e5-927c-1fa228b70f12.jpeg)

It's easier to do these steps on paper than in code, so iterate frequently at this stage to save yourself time down the road.

Once you have wireframes for the different pages of your site, you can wireframe how the pages will connect to each other by drawing the user flow.

![user-flow](https://cloud.githubusercontent.com/assets/7833470/11330163/1df572f6-915b-11e5-9458-a37dcc670360.png)

The more time you spend on this step, the easier it will be to structure your HTML. Well-structured HTML will make it easier to implement your CSS, to manipulate the DOM, and to figure out what routes you need to get data for the page.

### Data Models and ERD

Use an entity relationship diagram (ERD) to plan out your data models and any relationship(s) among them. In your diagram, write out the properties for your schemas. Make sure to answer these questions:

* Will your application have many models or only a few?
* How will the models interact with each other?
* What attributes (properties) will the schemas have, and what kind of data types (string, integer, collection, etc.) will they use?


### Numerical Categories for Relationships

### One-to-One

Each person has one brain, and each (living human) brain belongs to one person.

![one to one erd example](https://cloud.githubusercontent.com/assets/3254910/18140904/4d85c04e-6f6c-11e6-8301-c06bacff3dd3.png)

One-to-one relationships can sometimes just be modeled with simple attributes. A person and a brain are both complex enough that we might want to have their data in different models, with lots of different attributes on each.

### One-to-Many

Each leaf "belongs to" the one tree it grew from, and each tree "has many" leaves.

![one to many erd example](https://cloud.githubusercontent.com/assets/3254910/18182445/e4bddb6c-7044-11e6-9099-314b773724f3.png)


### Many-to-Many

Each student "has many" classes they attend, and each class "has many" students.


![many to many erd example](https://cloud.githubusercontent.com/assets/3254910/18140903/4c56c3ee-6f6c-11e6-9b6d-4c6ffae81323.png)


#### Entity Relationship Diagrams

Entity relationship diagrams (ERDs) represent information about the numerical relationships between data, or entities.

![entity relationship diagram example](https://cloud.githubusercontent.com/assets/3254910/18141666/439d9392-6f6f-11e6-953f-c91415b85f3f.png)


Note: In the example above, all of the Item1, Item2, Item3 under each heading are standing in for attributes.

[More guidelines for ERDs](http://docs.oracle.com/cd/A87860_01/doc/java.817/a81358/05_dev1.htm)

### Feasibility Check

Before you get started, you'll want to do some research to see if what you're looking to do is possible in the amount of time you have. Some areas that you might want to investigate, depending on your app's desired functionality are:

* reading the documentation for an external api to determine what data you can request. Is it JSON? XML? Is all the information you want included in the response? Will you need to make several different requests to the API?  Do you need to sign up and wait for approval to use the API?

* verifying that you can successfully request data from your API with Postman or `curl`.

* researching something you want to use that hasn't been taught in class yet, like an external library or module, data store, etc.

#### Example Feasibility Checks

* [ ] Read Yelp API documentation.
* [ ] Use Postman to test Twilio API.
* [ ] Write a script to scrape news data.

## Outside-In Development

Outside-in development says you should start with the "outside" of your app - the views that the user sees - and move backwards to the server, then the database. Don't try to develop the whole front end of your app before moving on, but for each user story, page, or feature, you can follow the outside-in pattern.

Start with the basics of your view:

* [ ] An `index.html` file with static data directly in the file.
* [ ] Create an EJS client-side template based on the HTML structure.
* [ ] Use the template to display dynamic data from a temporary array on the client-side.
* [ ] Run `npm init` to set up your Node/Express app.
* [ ] Install necessary node modules, and set up boilerplate Express app.
* [ ] Test your ruoutes and views with a temporary array on the server, and set up a `GET` request to respond with the data.
* [ ] Set up MongoDB/Mongoose, and move the data to your database.

Once you have an index page populated with data from the database, you can move on to other views or features. Your data is already in the database, but try to follow the outside-in process to:

* [ ] Make a button that allows you to edit a specific data item.
* [ ] Create the `PUT` route on your server that updates individual items in the database.

# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Project One

## DESCRIPTION

It's time to put everything that you've learned in the past month together! For your first project you will build a full stack web application using Express, Node, EJS, Mongoose, and MongoDB.

The objective of this project is to:

* Apply the skills you've learned by building a full-stack web application from the ground up.
* Demonstrate mastery of topics covered during this course so far.
* Build a polished, published website you can share in your portfolio.

You will be working **in pairs (2 developers)** for this first project. Show us what you've got!

## CORE REQUIREMENTS
Make sure to do all of the following with your app.

* **Express APP** Build an Express Application that renders HTML pages from EJS Templates.
* **RESTful Routes** Design your CRUD routes using the [REST](https://git.generalassemb.ly/sf-sei-1/express-dynamic-routes#restful-routing-preview) convention.
* **Templating** Use EJS to render objects from MongoDB in the browser as HTML templates.
* **MongoDB** Persist at least one model to a Mongo Database. **At least one model needs to include full CRUD functionality.**
* **Git** 50+ commits. Commit early, commit often. Tell a story with your commits. Each message should give a clear idea what you changed. (And don't expose any secret keys/tokens on GitHub!)
* **Code Style** Write professional-looking code. Follow the [Airbnb Javascript Styleguide](https://github.com/airbnb/javascript).
* **Visual Design** Use Flexbox, CSS Grid, Bootstrap, Materialize, Foundation, Skeleton, or another CSS framework to make your front-end snazzy. First impressions matter!
* **Heroku** Deploy your app to Heroku **(we will cover this together)**.
* **Documentation** Write a README.md that would make an employer excited to hire you. Screenshots are encouraged. See the [example readme](./example-readme.md) for a suggested structure, or these examples here: [more readme files](https://git.generalassemb.ly/wc-seir-405/Project_Planning_Examples).

## PLANNING DELIVERABLES

See the [planning deliverables](./planning.md) document for more information on the planning steps you should take.
  * A clearly defined **Minimum Viable Product ([MVP](http://en.wikipedia.org/wiki/Minimum_viable_product)) Scope**. What can you reasonably accomplish in a week? Anything outside of MVP can be added to your planning materials as Stretch Goals.
  * **Wireframes** for _every_ page. These don't have to be pretty; just sketch what the page will include.
  * **User Stories** (divided into sprints) - we recommend [Trello](https://trello.com/) for project tracking.
  * **Database Models and ERD** Make plans for each resource.  List the attributes you'll include in your schemas and what type of data each attribute will be. Draw an [Entity Relationship Diagram](https://www.google.com/search?tbm=isch&q=database%20table%20relationships%20drawing) to illustrate the relationship(s) between models, and note whether you plan to reference or embed related data.
  * A **Feasibility Check** for any bonus feature you'd like to complete.


Once your project has been approved, create a **GitHub Repo** for your project and [add your teaching team as collaborators](https://help.github.com/articles/adding-collaborators-to-a-personal-repository/).

## BONUS IDEAS
If you want to push yourself and learn something new, optionally consider doing some of the following with your app, but *please talk to an instructor* beforehand:

* **Front-End Data Validation** Validate data on the front-end by handling incorrect form inputs during create/update. For example, when a form is submitted, check that a field has some text in it, or that its value is a number.
* **Back-End Data Validation** Validate data on the back-end using mongoose's [built-in validations](http://mongoosejs.com/docs/validation.html#built-in-validators), or make your own custom validation.
* **More Models** Add another model to your project.
* **Relationships** Add a one one-to-many or many-to-many relationship between models. You can choose to reference or embed your data.
* **External API** Use an external API to integrate rich data into your app.
* **Model Methods** Level up your models by adding a method to one of your schemas.  For example, a person schema with `firstName` and `lastName` can have a `fullName` method (see mongoose docs on [instance methods](http://mongoosejs.com/docs/guide.html#methods) and [static methods](http://mongoosejs.com/docs/guide.html#statics)).
* **Authentication** Enable users to store account information and signup, login, and logout.
* **Sass** Use a CSS pre-compiler to write more imperative CSS.
* **Whatever else inspires you!**

## TIMELINE

> DO NOT START CODING UNTIL YOUR PROJECT IS APPROVED. CONFIRM THAT YOU ARE APPROVED ON THIS SPREADSHEET: [PROJECT APPROVAL SPREADSHEET](https://docs.google.com/spreadsheets/d/1vEPHZfy_jkcZDzCExebrMebKZBaCEIdDaAlwZp9XEVs/edit?usp=sharing).


* **Friday, January 7th** - Plan your application. Before you begin work on your project, the [planning deliverables](./planning.md) must be checked off with an instructor!
* **Thursday, January 13th @ 4:00 PM** - Feature Freeze! Deploy your code to Heroku, and start polishing existing features. Finalize your README.md and prepare for presentations.
* **Friday, January 14th** - Project due and presentations!

## WHAT WE ARE LOOKING FOR

#### Code must be...
* Clean
  - no unused or commented-out code
  - proper spacing and indentation
* Modular and well organized
  - use the module pattern with `module.exports`
  - separate large tasks into shorter functions
* Appropriately commented
  - use comments to plan, but remove the unnecessary comments for your professional portfolio
  - prefer a well-named variable or function to a comment

## ACCESS TO INSTRUCTORS
We will hold 1:1s throughout the week. We will also do mini lessons on certain topics if we notice that several people are running into the same issues.

## FINAL DELIVERABLES

* Completion of the **core requirements**
* A link to your website **hosted on Heroku**
* A link to your **source code on GitHub**
* A `README.md` file that serves as your **project documentation** (this is important!)
* A **10 minute presentation**, in the company of friends, illustrating:
    - Triumphs
    - Challenges
    - And _3_ lines(!) of code you want to share with your classmates, copied into a seperate document.
    - Words of Wisdom

## Presentation Tips
* Please zoom your browser window to 150%.
* Please set your Text Editor font to at least 20.0 pixels.
* And speak up!

## Teams

<details>
  <summary><h3>Happy Coding :)</h3></summary>
  <ul>
   <li>Amanda, Austin</li>
   <li>Elissa, Michelle</li>
   <li>Alex N, Neha</li>
   <li>Fariba, Alex W, Dorothy</li>
  </ul>
</details>




# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Project 1 Feedback

**Your project will be evaluated based on the following criteria:**

* **Technical Requirements**: Did you deliver a project that met all the technical requirements?

* **Creativity**: Did you add a personal spin or creative element to your project? Did you deliver something of value to the end user?

* **Code Quality**: Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code?

* **Problem Solving**: Are you able to defend why you implemented your solution in a certain way? Can you demonstrate that you thought through alternative implementations? *(Note that this part of your feedback evaluation will take place during your one-on-one code review with your instructors, after you've completed the project.)*

You'll be receiving written feedback from your instructors as well has having a one-on-one meeting to go over the feedback and your code. Each of the criteria above will be evaluated as one of **incomplete**, **does not meet expectations**, **meets expectations**, or **exceeds expectations**.



# FAD-Games Tree structure
.
├── README.md
├── controllers
│   ├── gamesController.js
│   ├── reviewsController.js
│   └── usersController.js
├── models
│   ├── Game.js
│   ├── Review.js
│   ├── User.js
│   ├── index.js
│   └── tempGames.js
├── package-lock.json
├── package.json
├── public
│   └── main.css
├── server.js
├── serverP.js
└── views
    ├── games
    │   ├── game-edit.ejs
    │   ├── game-index.ejs
    │   ├── game-new.ejs
    │   ├── game-show.ejs
    │   └── game.showP.ejs
    ├── home.ejs
    ├── partials
    │   ├── footer.ejs
    │   ├── head.ejs
    │   └── nav.ejs
    ├── reviews
    │   ├── review-edit.ejs
    │   └── review-new.ejs
    └── users
        ├── practiceNewUser.ejs
        ├── user-edit.ejs
        ├── user-index.ejs
        ├── user-new.ejs
        └── user-show.ejs

8 directories, 30 files


