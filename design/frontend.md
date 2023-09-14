# Frontend design:

## Layout
main design of the app:
- main layout 
  - This code defines a React component called "MainLayout" that serves as a basic layout structure for a web page, including a header, main content area, and navigation menu.
- header (which will appear at all time)
- menu admin/user with authorization accordingly
- Routing to local components : `auth routes` ,`holiday routes`, `admin routes` 
## Auth
  - Login component :
   - login box : 
      - header
      - input field : `email`, `password`
      - submit button - make a request and the server will return credentials via jwt
      - navigation button for signUp a new user
  - Signup component:
       - header
      - input field :`first name`, `last name`, `email`, `password`
      - submit button - make a request and the server will return Token via jwt
      - navigation button login


## Holidays
- Home Holiday component:
   - header
   - menu bar contains filterd holiday with Checkbox : `current holiday`, `upcoming holidays`, `following holidays`
     - current holiday display filter pagination current holidays
     - upcoming holiday display filter pagination upcoming holidays
     - following holidays display filter pagination holidays by followers count (highest number to lowest number)
   - main Card list view 
   - bottom pagination : 9 cards per page
  
- Card List component:
   - user mode:
     - Card contains data of holiday from api: `Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
     - Follow button that make user follow holiday + displays the follower counts for the specific Holiday
   - admin mode:
     - Card contains data of holiday from api: `Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
     - Edit icon button : edit the holiday by id
     - Delete icon button : delete the holiday by id

## Admin
- Home Admin component:
   - header
   - menu bar contains: `add holiday button`, `holidays/follower Report button`, `sign Out button`
   - main Card list view 
     - bottom pagination : 9 cards per page

- Add\Edit Holiday component:

- uses `handleSubmit` , `editmode (for editing the holiday)` , `holiday`
   - menu bar contains: `add holiday button`, `holidays/follower Report button`, `sign Out button` , `Back home button`
   - Edit Holiday Box : `admin/Edit-holiday`
      - header
      - input field :`Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
        - all input fields are with data fetched from api endpoint "../EditHoliday"
  
   - Add Holiday Box :  `admin/add-holiday`
      - header
      - input field :`Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
        - all fields are empty and required
      - for both views edit /add:
        - dates pickers has to be with logic presented in the requirement document
        - image upload button with "fileUpload" method
        - submit button
  
- Holiday Reports component:
   - header
   - Graph fetch data from api endpoint : `followers-holidays-report`:
    - axis y = counts of follower via server service followerCounts
    - axis x = present the holidays via server service getAllHoliday 
  
### Services
- api index endpoint to server via cors `baseURL + "/auth/`,`baseURL + "/holidays/`,`baseURL + "/admin/`
- notifcation service : defines a notification service using the "notyf" library
- interceptor service : defines


### Redux
- authState component :`authActions`, `authReducer` ,`authStore`
   -This code defines a Redux store and associated actions, reducers, and initial state for managing authentication state, including user tokens and user data.
- holidayState component :`holidayActions` ,`holidayReducer`, `holidayStore`
- followerState component :`followerActions`, `followerReducer` ,`followerStore`

