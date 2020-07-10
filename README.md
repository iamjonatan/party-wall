# PartWall Project 

Setup Instructions:
1. Clone this repository
2. Download and install nodejs (https://nodejs.org/en/download/)
3. Open terminal this directory of the project: `cd .../party-wall`
4. Install project (npm) dependencies: `npm install`
5. Run the project: npm start

###Frameworks & technologies used:
- Database: mongodb with mongoose mapper (I chose it because am more experienced with NoSQL so best option on limited time)
- Dependency Injection: I used typedi for dependcy injection of serces and userDao. I create DAOs so that main logic is separated from database tech including mappers (good for migration)

###Note on Database:
I used a free remote mongodb database because my computer was slow running database locally.

