- Chec if you have the extension "humao.rest-client" in your VSCode
- check if DOcker is installed in your system , if not go to https://www.docker.com
- to run the project open the terminal and type  [ docker-compose up -d ] (without brakets)
- wait for conection (mabe 15 - 30 seconds)
- the API will started in http://localhost:3000
- to test open the file "test.http" chose one endpoint and click in "send request" to run


------------------------------------------------------------------------------------------------

nstructions for : trends-final-proj image
1- pull command:   docker pull allanbarcelos/trends-final-proj
2- Check if you have the extension "humao.rest-client" in your VSCode
3- check if Docker is installed in your system , if not go to https://www.docker.com
4- to run the project open the terminal and type  [ docker-compose up -d ] (without brakets)
5- wait for conection (maybe 15 - 30 seconds)
6- the API will started in http://localhost:3000
7- to test open the file "test.http" chose one endpoint and click in "send request" to run

 


Docker Compose:
services:
    api:
        image: node
        ports: 
            - "3000:3000"
        volumes:
            - ./:/usr/api
        depends_on:
            - db
        working_dir: /usr/api
        environment:
            - PORT=3000
            - MONGO_URI=mongodb://admin:password@db:27017
            - MONGO_DB_NAME=Marketing
        command: bash -c "npm install && npm start"
        networks:
            - default
    db:
        image: mongo
        restart: always
        environment:
            - MONGO_INITDB_ROOT_USERNAME=admin
            - MONGO_INITDB_ROOT_PASSWORD=password
            - MONGO_INITDB_ROOT_DATABASE=Marketing
        ports:
            - "27017:27017"
        networks:
            - default
------------------------------------------------------------------------------------------------------------------
