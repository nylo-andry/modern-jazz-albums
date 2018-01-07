# Modern Jazz Album

A checklist to keep track of the listened albums listed by [Learn Jazz Standards](https://www.learnjazzstandards.com/blog/all-about-jazz/jazz-album-reviews/92-modern-jazz-albums-need-listen/).

## Getting Started

    npm install
    npm start

Then open your browser at `http://localhost:8000`.

## Firebase Database

The setup is currently bound to one of my firebase project and needs authentication. It is possible to reproduce the same setup just by creating your own firebase project and having your database modeled as:

    {
      "albums" : [ 
        {
          "id" : 0,
          "listened" : true,
          "title" : "Around the Corner - Grant Stewart"
        },
        ...
      ]
    }

The app currently only supports login by email and password.