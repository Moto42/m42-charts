# M42 Charts Microservice

This service will accept dataset and return an image of a chart displaying that information.

## Tasks


## Planning

### Backend

- [ ] Accepts GET requests to `\**/api/chart/`
  - [ ] Returns a chart in .svg format.

### Frontend

  #### API documentation
  - [ ] Lists and describes all the API endpoints, their required fields/queries, and the options available
   - [ ] `\**/api/chart/`
    
  #### Demonstration Page
  - [ ] User can enter data and select options
  - [ ] Makes requests to the API and displays the result

### D3 Charts Module
This will be the code that actualy converts the data recieved into an image.
Initialy it will only return in .svg format, with other formats coming after that.
