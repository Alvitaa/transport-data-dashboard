# Dashboard Analytics of Urban Transport Data - Angular + Tailwind CSS

While this project currently uses mocked data, it is designed with real-world scenarios in mind. In a future iteration, the mocked dataset will be replaced with real urban transport data, either loaded from official open data files provided by a city or consumed from an external public API that i have yet to find.

The main focus of this project is not the data source itself, but the architecture, structure, and implementation of a scalable Angular application. This project aims to demonstrate my experience building data-driven frontend applications using Angular, including state management, data transformation, reactive programming, and modular architecture.

Through this project, I showcase my ability to design clean and maintainable codebases, handle complex data flows, and present meaningful insights through an interactive and user-focused dashboard, following modern Angular best practices.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1. Also uses [Tailwind](https://tailwindcss.com) version 4.1.12.

## Used Dependencies

- Chart JS: Used to show relevant graphics about the mocked data. For example, I used a Line Chart to show and compare all the passangers transported in a day by line. I also used a Grouped Bar chart to compare Expected vs Actual Demand by Line per day.
- Bcrypt: Used to simulate encryption of Login information that in a real life scenario would get sent to a backend server to manage login logic.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.