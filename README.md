- REQUIREMENT: 
    + nodejs version >= 18
    + npm version >= 9.3.1
    + MySQL
    
- START: 
  With project front_end:
    1. Open terminal run: npm install --global yarn (You can skip this part if you have installed it before)
    2. Run: yarn 
    3. Run: yarn run dev
    4. vola !!!
    
  With project back_end:
    1. config url database in scr/main/resources/application.properties
    
  With database
    1. create database name corresponding to data base you was config in file application.properties: 
      example: java_spring_boot / port: 3306 / username: root / password: 123456
    2. create table products, bills, bill_products
      (check fields table in folder entities)
   
