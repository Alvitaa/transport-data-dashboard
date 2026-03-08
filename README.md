# Dashboard Analytics of Urban Transport Data - Angular + Tailwind CSS

This project is a dashboard to make easier the process of viewing and analyzing data of urban transportation. Through the use of KPI, Tables and Charts to showcase important data and indicators, the urban tranport dashboard allows you to see deficiencies and take informed decisions, being the key goal of any dashboard.

While this project currently uses mocked data, it is designed with real-world scenarios in mind. In a future iteration, the mocked dataset will be replaced with real urban transport data, either loaded from official public data files provided by a city or consumed from an external public API that i have yet to find.

## Live Demo

This demo is available from this [Link](https://alvitaa.github.io/transport-data-dashboard/). This website uses github pages.

## Technologies

- **Angular**: Library used to develop the components and pages.
- **Chart.js**: Used to visualize insights from the mocked transport data. A Line Chart is used to display passanger volume over time per Line, while a Groped Bar Chart is used to compare Expected vs Actual Demand by line on a given day.
- **ng2-charts**: Angular wrapper for Chart.js, allowing integration of chart components within the Angular enviroment.
- **RxJS**: Used internally by Angular for handling asynchronous operations and reactive data flows. In this case its used for the mocked data handling.
- **bcryptjs**: Used to simulate password hashing in the mocked authentication logic. This avoids storing credentials in plain text and reflects real-world authentication practices, where password verification would occur on a backend service.

## Features

- Login authentication using bcrypt, even though the credentials are hardcoded.
- Shows KPI of the total effectiveness of the urban transport of the city.
- Shows table of all the essencial data about each line, such as passangers, delta of passangers by each day, demand and time intervals.
- Change the data showed by day using date selector.
- Uses charts to see data and compare line efficency and usage.
- Responsiveness to be used as efficiently whether you use desktop or mobile.

## The Thought Process

I've always had such an interest in Urban data projects and their development, so I had to develop something connected to that theme. In Peru, my country, urban transport is a big problem that affects great part of the population, most of us having to commute large distances using bad urban transport that lacks reach, scale and even formality.

Sadly, the focus of this project is not the data source itself, but to show and assure there is an opportunity in the use of technology to obtain insights and use them in meaningful matters. This project is basic as it aims to demonstrate my experience building data-driven frontend applications using Angular.

## How to run it yourself

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run the development server with `ng serve`
4. Finally, open your browser and navigate to `http://localhost:4200/`

In case `ng serve` doesnt execute correctly, check if angular is installed with `ng version`. If not installed, then run `npm install @angular/cli --save-dev`.

## Preview



This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1. Also uses [Tailwind](https://tailwindcss.com) version 4.1.12.