# PartyWall Project 

Setup Instructions:
1. Clone this repository
2. Download and install nodejs (https://nodejs.org/en/download/)
3. Open terminal this directory of the project: `cd .../party-wall`
4. Install project (npm) dependencies: `npm install`
5. Run the project: npm start
6. Calling APIs:
- All API paths are printed in the console after running app. Just prefix them with: http://localhost:1994
- signup: POST method with json body: { username:string, password:string }
- signin: POST method with body: { username:string, password:string }
- Item: create, remove, viewall (all POST - I should have made 'viewall' a GET method but realized late)
    - these APIs require an authorization token which is sent in response to signin or signup
    - use that token in the header of your API call with Authorization Type - Bearer Token
    - create: 
        - { name: string, description:string, weight:string, price: string, quantity:string, type:string (can only be food or drink else error)}
        - OR
        - { name: string, volume:string, price: string, quantity:string, type:string (can only be food or drink else error)}
    - remove:
        - { id: string } (id of item to delete)
    - viewall (no parameters just authorization token)


###Frameworks & technologies used:
- Database: mongodb with mongoose mapper (I chose it because am more experienced with NoSQL so best option on limited time)
- Dependency Injection: I used typedi for dependcy injection of serces and userDao. I create DAOs so that main logic is separated from database tech including mappers (good for migration)

###Note:
- Database: I used a free remote mongodb database because my computer was slow running database locally.
- Necessary to mention: The project architecture is inspired by Sam Quin on his blog: https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf.
I have been using most of this architecture (including authorization example) in most of my nodejs projects.
