# Dashboard Analytics of Urban Transport Data - Angular + Tailwind CSS

While this project currently uses mocked data, it is designed with real-world scenarios in mind. In a future iteration, the mocked dataset will be replaced with real urban transport data, either loaded from official open data files provided by a city or consumed from an external public API that i have yet to find.

The main focus of this project is not the data source itself, but the architecture, structure, and implementation of a scalable Angular application. This project aims to demonstrate my experience building data-driven frontend applications using Angular, including state management, data transformation, reactive programming, and modular architecture.

Through this project, I showcase my ability to design clean and maintainable codebases, handle complex data flows, and present meaningful insights through an interactive, responsive and user-focused dashboard, following modern Angular best practices.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1. Also uses [Tailwind](https://tailwindcss.com) version 4.1.12.

## Dependencies

- **Chart.js**: Used to visualize insights from the mocked transport data. A Line Chart is used to display passanger volume over time per Line, while a Groped Bar Chart is used to compare Expected vs Actual Demand by line on a given day.
- **ng2-charts**: Angular wrapper for Chart.js, allowing integration of chart components within the Angular enviroment.
- **RxJS**: Used internally by Angular for handling asynchronous operations and reactive data flows. In this case its used for the mocked data handling.
- **bcryptjs**: Used to simulate password hashing in the mocked authentication logic. This avoids storing credentials in plain text and reflects real-world authentication practices, where password verification would occur on a backend service.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.