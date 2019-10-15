# L2K_Calendar_Application
# Unit 05 Third-Party APIs Homework: Day Planner

A simple calendar that allows a user to save events for each hour of the day. This app runs in the browser and has the following features:
* AM/PM formatted time slots
* non-working hours displayed in gold
* working hours (9:00 AM to 5:00 PM) displayed in different colours based on whether or not time slot is in the past, present or future
  - past hours displayed as grey
  - present hour displayed as red
  - future hours dispolayed as green

Entering an "event" posts the event to "application memory" but does not save permanently. To save an event click the Save Entry button in the time slot. This writes the event to "permanent memory" i.e. localStorage.

The current date and time is displayed at the top of the page and refreshed each second by means of  timer.


