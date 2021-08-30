# SunshineDetector (Group project)


URL
https://emmy-codes.github.io/SunshineDetector/mainpage.html


I worked with three wonderful classmates to come up with the idea of detecting sunrise and sunset where you are using HTML, CSS, JS and an API or two.

We worked on most of the project together as there were a lot of challenges and we felt it would benefit our learning better to overcome those obstacles together. It was our first API use, which presented interesting challenges getting it to work (getting the key working, displaying just the data we wanted etc).

Once it was displaying our sunrise/sunset time and your location, we needed a countdown that would read your current time and the time of sunset/sunrise and countdown to either sunset or sunrise, depending which was closer. This turned out to be very challenging for us to put together in JavaScript, as there were so many things to consider (if it was past midnight it changed the way the countdown worked so we needed extra parameters to account for it, once it hit sunset could we get it to change to sunrise countdown straight away((I don't think we managed that in the end)).

((Below are very short summaries on a project we worked on 10months ago, and isn't fully representitive of everyone's work))

Cecilia, researched on using media queries to enable better responsiveness with our CSS mountainrange, as well as adding a colour change when sunset had been reached.
Aleksandra introduced us to CSS variables which turned out to be very useful! She also worked on creating a visual effect around the sun
When we were close to completion, Sofia created a second API with quotes/jokes that were hidding in the clouds for you to click on.

# Personal implementation

I myself worked on creating a loading screen using a skeleton UI which would account for the time of the API request. I coded in the visuals in CSS, with basic DOM manipulation on promise resolution (once the API had loaded). I also added variants for the loader for sunset and sunrise in HTML and CSS. I implemented basic location fetching by utilising the geolocation API and forwarded the coordinates to the REST API to fetch the sunrise/sunset data.
