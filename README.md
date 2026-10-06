# Fleet Operations Demo

**Live demo: https://ramsay-talmadge.github.io/UC-Demo/**

> **Practice project.** I built this to practice designing a maintenance-management (CMMS) interface. The county, assets, vendors and people are fictional sample data.

A browser-based prototype of a county fleet maintenance system (CMMS): assets, work orders, parts inventory, preventive maintenance and cost reporting.

It's a demo, not a production system. All data is sample data held in memory, so reloading the page (or clicking **Reset demo data**) returns to the starting state.

## Run it

Open the [live demo](https://ramsay-talmadge.github.io/UC-Demo/) in a modern browser. To run it locally, download the repo and open `index.html`. There's no install or build step.

Jump straight to a view with a hash, e.g. `index.html#/work-orders` or `index.html#/reports`.

## What's in it

- **Dashboard**: KPIs, labor-hours chart, and a priority queue built from overdue/critical work and due PM.
- **Assets**: searchable, filterable, sortable registry; click a row for the full record with work order and PM history.
- **Work orders**: create with labor/parts/vendor costs; start and close from the queue. Closing a PM-linked work order reschedules that PM.
- **Inventory**: stock status derived from on-hand vs. reorder point.
- **Preventive maintenance**: schedule sorted by due date, with overdue / due soon status.
- **Reports**: cost by department and vendor, and % of expected life used for replacement planning.
- **Roles**: Supervisor (create, start, close), Mechanic (create, start; closing needs a supervisor), View Only.

Sample dates are generated relative to today, so the demo stays current.

## Files

- `index.html`: layout and views
- `styles.css`: styling
- `app.js`: sample data, rendering, and interactions
